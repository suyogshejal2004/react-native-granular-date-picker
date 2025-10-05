
---

# React Native Granular Date Picker

A **customizable date picker component** for React Native applications. This component allows users to select dates with support for **day, month, and year selection**, and provides **various styling options**. Easy to integrate and fully customizable to fit your app's theme.

---

## 📸 Demo Screenshots

## 📸 Demo Screenshots

<p align="center">
  <img src="https://raw.githubusercontent.com/suyogshejal2004/react-native-granular-date-picker/main/assets/Screenshot_1759664292.png" width="150">
  <img src="https://raw.githubusercontent.com/suyogshejal2004/react-native-granular-date-picker/main/assets/Screenshot_1759664296.png" width="150">
  <img src="https://raw.githubusercontent.com/suyogshejal2004/react-native-granular-date-picker/main/assets/Screenshot_1759664394.png" width="150">
  <img src="https://raw.githubusercontent.com/suyogshejal2004/react-native-granular-date-picker/main/assets/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-10-05%20at%2017.09.28.png" width="150">
  <img src="https://raw.githubusercontent.com/suyogshejal2004/react-native-granular-date-picker/main/assets/Simulator%20Screenshot%20-%20iPhone%2016%20Pro%20-%202025-10-05%20at%2017.09.33.png" width="150">
</p>



---

## ⚡ Features

* Calendar view with day grid
* Month and year navigation
* Year selector mode
* Highlight for **today** and **selected date**
* Weekend highlighting
* Customizable **colors, fonts, and styles**
* Min and max year limits
* Callbacks for **date selection, confirmation, and cancellation**
* Responsive design based on device width

---

## 💿 Installation

```bash
npm install react-native-granular-date-picker
# or
yarn add react-native-granular-date-picker
```

No additional dependencies are required beyond **React Native core components** (`FlatList`, `TouchableOpacity`, etc.).

---

## 🚀 Usage

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GranularDatePicker } from 'react-native-granular-date-picker';

const App = () => {
  const handleSelectDate = (date: Date) => console.log('Selected:', date);
  const handleConfirm = (date: Date) => console.log('Confirmed:', date);
  const handleCancel = () => console.log('Cancelled');

  return (
    <SafeAreaView style={styles.container}>
      <GranularDatePicker
        initialDate={new Date()}
        minYear={2000}
        maxYear={2030}
        onSelectDate={handleSelectDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        primaryColor="#4CAF50"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
});

export default App;
```

> Tip: Best used inside a **modal** (e.g., `react-native-modal`) to appear as a popup.

---

## 📝 Props

| Prop Name         | Type                   | Default          | Description                         |
| ----------------- | ---------------------- | ---------------- | ----------------------------------- |
| `initialDate`     | `Date`                 | `new Date()`     | Initial date to display             |
| `minYear`         | `number`               | `1950`           | Minimum selectable year             |
| `maxYear`         | `number`               | `2050`           | Maximum selectable year             |
| `onSelectDate`    | `(date: Date) => void` | -                | Callback when a date is selected    |
| `onConfirm`       | `(date: Date) => void` | -                | Callback when **OK** pressed        |
| `onCancel`        | `() => void`           | -                | Callback when **CANCEL** pressed    |
| `primaryColor`    | `string`               | `#007AFF`        | Primary color for selected elements |
| `secondaryColor`  | `string`               | `#E8F0FE`        | Secondary color for highlights      |
| `textColor`       | `string`               | `#333`           | Default day text color              |
| `headerTextColor` | `string`               | `#333`           | Month/year header color             |
| `arrowColor`      | `string`               | `#555`           | Color for navigation arrows         |
| `fontFamily`      | `string`               | Platform default | Font for all text                   |

> You can also pass custom **styles** for container, day cells, header, buttons, and year selector.

---

## 🎨 Customization Example

```tsx
<GranularDatePicker
  primaryColor="#FF5722"
  secondaryColor="#FFEBEE"
  textColor="#212121"
  containerStyle={{ backgroundColor: '#FAFAFA', borderRadius: 20 }}
  selectedDayContainerStyle={{ backgroundColor: '#FF5722', borderWidth: 0 }}
/>
```

---

## 📌 Notes

* Responsive to device width for day cells.
* Weekends highlighted by default (customizable).
* Placeholder days maintain the grid structure.
* Combine with `GranularTimePicker` for full date-time selection.

---

## ⚖ License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions welcome! Open an issue or submit a pull request.

---

