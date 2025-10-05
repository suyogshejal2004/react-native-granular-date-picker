// --- Types for Props ---
import { useState, useEffect, useMemo, useCallback } from 'react'; // React import removed
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  type ViewStyle,
  type TextStyle,
  FlatList,
  type StyleProp,
} from 'react-native';

// --- Helper Functions ---
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const areDatesEqual = (d1: Date, d2: Date) =>
  d1 &&
  d2 &&
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// --- Type definition for a day object in the grid ---
type DayObjectType = {
  key: string;
  day?: number;
  date?: Date;
  isPlaceholder: boolean;
  isToday?: boolean;
  isSelected?: boolean;
  isWeekend?: boolean;
};

const getMonthData = (
  visibleDate: Date,
  selectedDate: Date
): DayObjectType[] => {
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = getDaysInMonth(year, month);
  const gridData: DayObjectType[] = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    gridData.push({ key: `ph-${i}`, isPlaceholder: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    const dayOfWeek = currentDate.getDay();
    gridData.push({
      key: `day-${currentDate.toISOString()}`,
      day: i,
      date: currentDate,
      isPlaceholder: false,
      isToday: areDatesEqual(currentDate, today),
      isSelected: areDatesEqual(currentDate, selectedDate),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    });
  }
  return gridData;
};

export type GranularDatePickerProps = {
  initialDate?: Date;
  minYear?: number;
  maxYear?: number;
  onSelectDate?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  headerTextColor?: string;
  arrowColor?: string;
  fontFamily?: string;
  containerStyle?: ViewStyle;
  selectedDateHeaderStyle?: ViewStyle;
  selectedDateHeaderText?: TextStyle;
  monthNavigationContainerStyle?: ViewStyle;
  monthNavigationTextStyle?: TextStyle;
  arrowButtonStyle?: ViewStyle;
  arrowIconStyle?: TextStyle;
  dayOfWeekContainerStyle?: ViewStyle;
  dayOfWeekTextStyle?: TextStyle;
  dayContainerStyle?: ViewStyle;
  dayTextStyle?: TextStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
  selectedDayContainerStyle?: ViewStyle;
  selectedDayTextStyle?: TextStyle;
  weekendTextStyle?: TextStyle;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;
  okButtonStyle?: ViewStyle;
  okButtonTextStyle?: TextStyle;
  yearSelectorContainerStyle?: ViewStyle;
  yearSelectorButtonStyle?: ViewStyle;
  yearSelectorButtonTextStyle?: TextStyle;
  selectedYearSelectorButtonStyle?: ViewStyle;
  selectedYearSelectorButtonTextStyle?: TextStyle;
};

// --- Main Component ---
export const GranularDatePicker = ({
  initialDate = new Date(),
  minYear = 1950,
  maxYear = 2050,
  onSelectDate,
  onConfirm,
  onCancel,
  primaryColor = '#007AFF',
  secondaryColor = '#E8F0FE',
  textColor = '#333333',
  headerTextColor = '#333333',
  arrowColor = '#555555',
  fontFamily = Platform.OS === 'ios' ? 'System' : 'Roboto',
  containerStyle,
  selectedDateHeaderStyle,
  selectedDateHeaderText,
  monthNavigationContainerStyle,
  monthNavigationTextStyle,
  arrowButtonStyle,
  arrowIconStyle,
  dayOfWeekContainerStyle,
  dayOfWeekTextStyle,
  dayContainerStyle,
  dayTextStyle,
  todayContainerStyle,
  todayTextStyle,
  selectedDayContainerStyle,
  selectedDayTextStyle,
  weekendTextStyle,
  cancelButtonStyle,
  cancelButtonTextStyle,
  okButtonStyle,
  okButtonTextStyle,
  yearSelectorContainerStyle,
  yearSelectorButtonStyle,
  yearSelectorButtonTextStyle,
  selectedYearSelectorButtonStyle,
  selectedYearSelectorButtonTextStyle,
}: GranularDatePickerProps) => {
  const { width } = Dimensions.get('window');
  const ITEM_SIZE = useMemo(() => Math.floor((width - 80) / 7), [width]);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [visibleDate, setVisibleDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<'calendar' | 'year'>('calendar');

  const yearData = useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear]
  );
  const monthData = useMemo(
    () => getMonthData(visibleDate, selectedDate),
    [visibleDate, selectedDate]
  );

  useEffect(() => {
    onSelectDate?.(selectedDate);
  }, [selectedDate, onSelectDate]);

  const handleConfirmPress = () => {
    onConfirm?.(selectedDate);
  };
  const changeMonth = (amount: number) => {
    const newDate = new Date(visibleDate);
    newDate.setMonth(newDate.getMonth() + amount);
    const year = newDate.getFullYear();
    if (year >= minYear && year <= maxYear) {
      setVisibleDate(newDate);
    }
  };
  const handleDayPress = (date: Date) => {
    setSelectedDate(date);
  };
  const handleYearPress = (year: number) => {
    const newVisibleDate = new Date(visibleDate);
    newVisibleDate.setFullYear(year);
    setVisibleDate(newVisibleDate);
    setViewMode('calendar');
  };

  const renderDay = useCallback(
    ({ item }: { item: DayObjectType }) => {
      const containerStyles: (ViewStyle | undefined)[] = [
        styles.dayCell,
        { width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: ITEM_SIZE / 2 },
      ];
      if (dayContainerStyle) containerStyles.push(dayContainerStyle);

      const textStyles: (TextStyle | undefined)[] = [
        styles.dayText,
        { fontFamily },
      ];
      if (dayTextStyle) textStyles.push(dayTextStyle);

      if (item.isPlaceholder) {
        return <View style={containerStyles as StyleProp<ViewStyle>} />;
      }

      // Set default text color, which might be overridden by other styles
      textStyles.push({ color: textColor });

      if (item.isWeekend) {
        if (weekendTextStyle) textStyles.push(weekendTextStyle);
        else textStyles.push(styles.weekendText);
      }
      if (item.isToday) {
        containerStyles.push(styles.todayContainer, {
          borderColor: primaryColor,
          backgroundColor: secondaryColor,
        });
        if (todayContainerStyle) containerStyles.push(todayContainerStyle);
        textStyles.push(styles.todayText);
        if (todayTextStyle) textStyles.push(todayTextStyle);
      }
      if (item.isSelected) {
        containerStyles.push(styles.selectedDayContainer, {
          backgroundColor: primaryColor,
          borderColor: primaryColor,
        });
        if (selectedDayContainerStyle)
          containerStyles.push(selectedDayContainerStyle);
        textStyles.push(styles.selectedDayText);
        if (selectedDayTextStyle) textStyles.push(selectedDayTextStyle);
      }

      return (
        <TouchableOpacity
          onPress={() => item.date && handleDayPress(item.date)}
        >
          <View style={containerStyles as StyleProp<ViewStyle>}>
            <Text style={textStyles as StyleProp<TextStyle>}>{item.day}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [
      ITEM_SIZE,
      primaryColor,
      secondaryColor,
      textColor,
      fontFamily,
      dayContainerStyle,
      dayTextStyle,
      todayContainerStyle,
      todayTextStyle,
      selectedDayContainerStyle,
      selectedDayTextStyle,
      weekendTextStyle,
    ]
  );

  const renderYearSelector = () => (
    <View style={[styles.yearSelectorContainer, yearSelectorContainerStyle]}>
      <FlatList
        data={yearData}
        numColumns={3}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.yearButtonWrapper}
            onPress={() => handleYearPress(item)}
          >
            <View
              style={[
                styles.yearButton,
                yearSelectorButtonStyle,
                item === visibleDate.getFullYear() && {
                  backgroundColor: primaryColor,
                  ...selectedYearSelectorButtonStyle,
                },
              ]}
            >
              <Text
                style={[
                  styles.yearButtonText,
                  { fontFamily },
                  yearSelectorButtonTextStyle,
                  item === visibleDate.getFullYear() && {
                    color: '#FFF',
                    ...selectedYearSelectorButtonTextStyle,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderCalendarView = () => (
    <>
      <View
        style={[styles.monthNavigationContainer, monthNavigationContainerStyle]}
      >
        <TouchableOpacity
          style={styles.monthYearTouchable}
          onPress={() => setViewMode('year')}
        >
          <Text
            style={[
              styles.monthNavigationText,
              { fontFamily, color: headerTextColor },
              monthNavigationTextStyle,
            ]}
          >
            {visibleDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text style={[styles.dropdownIcon, { color: headerTextColor }]}>
            ▼
          </Text>
        </TouchableOpacity>
        <View style={styles.arrowButtonWrapper}>
          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            style={[styles.arrowButton, arrowButtonStyle]}
          >
            <Text
              style={[
                styles.arrowIcon,
                { fontFamily, color: arrowColor },
                arrowIconStyle,
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeMonth(1)}
            style={[styles.arrowButton, arrowButtonStyle]}
          >
            <Text
              style={[
                styles.arrowIcon,
                { fontFamily, color: arrowColor },
                arrowIconStyle,
              ]}
            >
              ›
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.dayOfWeekContainer, dayOfWeekContainerStyle]}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <Text
            key={day + index}
            style={[
              styles.dayOfWeekText,
              { fontFamily, color: textColor, width: ITEM_SIZE },
              dayOfWeekTextStyle,
              (index === 5 || index === 6) && weekendTextStyle,
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
      <FlatList
        data={monthData}
        renderItem={renderDay}
        numColumns={7}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.grid}
      />
    </>
  );

  return (
    <View
      style={[
        styles.container,
        { width: width - 40, backgroundColor: '#F8F9FA' },
        containerStyle,
      ]}
    >
      <View style={[styles.selectedDateHeader, selectedDateHeaderStyle]}>
        <Text
          style={[
            styles.selectedDateHeaderText,
            { fontFamily, color: primaryColor },
            selectedDateHeaderText,
          ]}
        >
          {selectedDate.toLocaleString('default', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>
      {viewMode === 'calendar' ? renderCalendarView() : renderYearSelector()}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={onCancel}
          style={[styles.actionButton, cancelButtonStyle]}
        >
          <Text
            style={[
              styles.actionButtonText,
              { color: primaryColor, fontFamily },
              cancelButtonTextStyle,
            ]}
          >
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConfirmPress}
          style={[styles.actionButton, okButtonStyle]}
        >
          <Text
            style={[
              styles.actionButtonText,
              { color: primaryColor, fontFamily },
              okButtonTextStyle,
            ]}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Default Styles ---
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    minHeight: 450,
  },
  selectedDateHeader: {
    padding: 15,
    backgroundColor: '#E8F0FE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedDateHeaderText: { fontSize: 24, fontWeight: 'bold' },
  monthNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  monthYearTouchable: { flexDirection: 'row', alignItems: 'center' },
  monthNavigationText: { fontSize: 18, fontWeight: '600' },
  dropdownIcon: { fontSize: 10, marginLeft: 8 },
  arrowButtonWrapper: { flexDirection: 'row' },
  arrowButton: { padding: 5 },
  arrowIcon: { fontSize: 22, fontWeight: 'bold' },
  dayOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
  },
  dayOfWeekText: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  dayCell: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 1,
  },
  dayText: { fontSize: 16, fontWeight: '500' },
  weekendText: { color: '#757575' },
  todayContainer: { borderWidth: 2 },
  todayText: { fontWeight: 'bold' },
  selectedDayContainer: { borderWidth: 2 },
  selectedDayText: { color: '#FFFFFF', fontWeight: 'bold' },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#F8F9FA',
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
    borderRadius: 5,
  },
  actionButtonText: { fontSize: 14, fontWeight: 'bold' },
  yearSelectorContainer: { flex: 1, padding: 10, backgroundColor: '#F8F9FA' },
  yearButtonWrapper: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearButton: {
    margin: 5,
    paddingVertical: 15,
    width: '85%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearButtonText: { fontSize: 16, fontWeight: '500' },
});
