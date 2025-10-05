import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
// Import both components from your library
import {
  GranularDatePicker,
  GranularTimePicker,
} from 'react-native-granular-date-picker';

export default function App() {
  // State for Date Picker
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State for Time Picker
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 30 });

  // This function is called when the user presses "OK" in the date picker
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date); // Update the app's state with the new date
    setDatePickerVisible(false); // Close the modal
  };

  // This function is called when the user presses "OK" in the time picker
  const handleTimeConfirm = (time: { hour: number; minute: number }) => {
    setSelectedTime(time); // Update the app's state with the new time
    setTimePickerVisible(false); // Close the modal
  };

  // Helper function to format the time for display
  const formatTime = (time: { hour: number; minute: number }) => {
    const hour12 =
      time.hour === 0 ? 12 : time.hour > 12 ? time.hour - 12 : time.hour;
    const minute = time.minute.toString().padStart(2, '0');
    const period = time.hour >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${period}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>My App</Text>

        {/* Button to open the Date Picker */}
        <TouchableOpacity
          style={styles.openPickerButton}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text style={styles.openPickerButtonText}>
            Select Date ({selectedDate.toLocaleDateString()})
          </Text>
        </TouchableOpacity>

        {/* Button to open the Time Picker */}
        <TouchableOpacity
          style={[
            styles.openPickerButton,
            { marginTop: 20, backgroundColor: '#28a745' },
          ]}
          onPress={() => setTimePickerVisible(true)}
        >
          <Text style={styles.openPickerButtonText}>
            Select Time ({formatTime(selectedTime)})
          </Text>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isDatePickerVisible}
          onRequestClose={() => setDatePickerVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <GranularDatePicker
              initialDate={selectedDate}
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisible(false)}
            />
          </View>
        </Modal>

        {/* Time Picker Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isTimePickerVisible}
          onRequestClose={() => setTimePickerVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <GranularTimePicker
              initialTime={
                new Date(
                  new Date().setHours(selectedTime.hour, selectedTime.minute)
                )
              }
              onConfirm={handleTimeConfirm}
              onCancel={() => setTimePickerVisible(false)}
              primaryColor="#28a745" // Example of customizing the theme
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0F2F5' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 50,
  },
  openPickerButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  openPickerButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
