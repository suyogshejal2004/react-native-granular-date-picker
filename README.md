
# 🗓 React Native Granular Date Picker

A sleek, responsive, and highly customizable **date and time picker** for React Native, giving you granular control over day, month, year, and time selection. Inspired by Google Calendar UI, this library provides a smooth, interactive, and modern experience for your users.

---

## ✨ Features

* **Date & Time Pickers**: Includes two components:

  * `GranularDatePicker` → Select day, month, and year
  * `GranularTimePicker` → Select hour and minute with an interactive clock
* **Modern UI**: Clean, Google Calendar-inspired design.
* **Highly Customizable**: Theme colors, fonts, and styles to match your app.
* **Interactive**: Smooth calendar grid, year view, and analog clock.
* **Pure JavaScript**: No native dependencies required.
* **Responsive**: Works on all screen sizes out of the box.

---

## 💿 Installation

```bash
npm install react-native-granular-date-picker
# or
yarn add react-native-granular-date-picker
```

---

## 🚀 Usage

It’s recommended to show the picker inside a `Modal` for the best UX.

---

### 📅 GranularDatePicker Example

```tsx
import React, { useState } from 'react';
import { View, Modal, Button, StyleSheet } from 'react-native';
import { GranularDatePicker } from 'react-native-granular-date-picker';

const MyScreen = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Select Date" onPress={() => setPickerVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPickerVisible}
      >
        <View style={styles.modalOverlay}>
          <GranularDatePicker
            initialDate={selectedDate}
            onConfirm={handleConfirm}
            onCancel={() => setPickerVisible(false)}
            primaryColor="#007BFF"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
});

export default MyScreen;
```

---

### ⏰ GranularTimePicker Example

```tsx
import React, { useState } from 'react';
import { View, Modal, Button, StyleSheet } from 'react-native';
import { GranularTimePicker } from 'react-native-granular-date-picker';

const MyScreen = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 30 });

  const handleConfirm = (time: { hour: number; minute: number }) => {
    setSelectedTime(time);
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Select Time" onPress={() => setPickerVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPickerVisible}
      >
        <View style={styles.modalOverlay}>
          <GranularTimePicker
            initialTime={new Date()}
            onConfirm={handleConfirm}
            onCancel={() => setPickerVisible(false)}
            primaryColor="#28a745"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
});

export default MyScreen;
```

---

## 🛠 Props (API Reference)

### GranularDatePicker Props

| Prop               | Type                   | Default       | Description                                                                                       |
| ------------------ | ---------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `initialDate`      | `Date`                 | `new Date()`  | Starting date for the picker                                                                      |
| `onConfirm`        | `(date: Date) => void` | `undefined`   | Returns the selected date when "OK" is pressed                                                    |
| `onCancel`         | `() => void`           | `undefined`   | Called when "CANCEL" is pressed                                                                   |
| `minYear`          | `number`               | `1950`        | Minimum year selectable                                                                           |
| `maxYear`          | `number`               | `2050`        | Maximum year selectable                                                                           |
| `primaryColor`     | `string`               | `'#007AFF'`   | Color for selected items and buttons                                                              |
| `secondaryColor`   | `string`               | `'#E8F0FE'`   | Background for today (unselected)                                                                 |
| `textColor`        | `string`               | `'#333333'`   | Default text color                                                                                |
| `fontFamily`       | `string`               | `System font` | Font family for all text                                                                          |
| `containerStyle`   | `ViewStyle`            | `undefined`   | Style for main container                                                                          |
| `selectedDayStyle` | `ViewStyle`            | `undefined`   | Style for selected day container                                                                  |
| `...`              | `...`                  | `...`         | Many other style props for full customization (`headerStyle`, `dayTextStyle`, `arrowStyle`, etc.) |

---

### GranularTimePicker Props

| Prop              | Type                                             | Default       | Description                                                                     |
| ----------------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------- |
| `initialTime`     | `Date`                                           | `new Date()`  | Starting time for the picker                                                    |
| `onConfirm`       | `(time: {hour: number; minute: number}) => void` | `undefined`   | Returns the selected time                                                       |
| `onCancel`        | `() => void`                                     | `undefined`   | Called when "CANCEL" is pressed                                                 |
| `primaryColor`    | `string`                                         | `'#007AFF'`   | Clock hand & selected numbers color                                             |
| `backgroundColor` | `string`                                         | `'#F8F9FA'`   | Background color for container                                                  |
| `textColor`       | `string`                                         | `'#333333'`   | Default text color                                                              |
| `fontFamily`      | `string`                                         | `System font` | Font family for all text                                                        |
| `containerStyle`  | `ViewStyle`                                      | `undefined`   | Main container style                                                            |
| `clockFaceStyle`  | `ViewStyle`                                      | `undefined`   | Analog clock face style                                                         |
| `...`             | `...`                                            | `...`         | Many other style props (`headerStyle`, `timeTextStyle`, `clockHandStyle`, etc.) |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License © [Suyog Shejal](https://github.com/suyogshejal2004)

---
