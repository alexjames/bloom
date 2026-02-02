# Bloom

A privacy-first period tracking app built with React Native and Expo.

## Overview

Bloom helps users monitor their menstrual cycles and predict upcoming periods, ovulation dates, and fertile windows. All data is stored locally on the device - no data is collected, stored on servers, or shared with third parties.

## Features

### Cycle Tracking
- **Current Cycle View** - See your current cycle day and phase (Period, Follicular, Ovulation, Luteal)
- **Period Predictions** - Get accurate predictions for your next 6 cycles
- **Ovulation Tracking** - View predicted ovulation dates and fertile windows
- **Period Logging** - Log period start dates with a quick "Today" button or date picker
- **Privacy-First** - 100% private, no additional or personally identifiable information (PII) is collected. Your data never leaves your phone. Your data is never collected or shared with third-parties.

### Calendar View
- Interactive calendar with swipeable month navigation
- Color-coded bands for periods, predictions, ovulation, and fertile windows
- Visual legend for easy understanding

### Customization
- Adjustable cycle length (21-40 days)
- Adjustable period length (2-10 days)
- Reset all data option

### Privacy
- 100% local data storage using AsyncStorage
- No accounts, no servers, no tracking
- Your data never leaves your device

## Tech Stack

- **React Native** 0.81 with **Expo** 54
- **Expo Router** for file-based navigation
- **Zustand** for state management with persistence
- **date-fns** for date calculations
- **react-native-calendars** for calendar UI
- **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app (for mobile testing) or emulator/simulator

### Installation

```bash
# Clone the repository
git clone https://github.com/buildbreak/bloom.git
cd bloom

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm start

# Run on specific platform
npm run android    # Android emulator/device
npm run ios        # iOS simulator/device
npm run web        # Web browser
```

After starting, scan the QR code with Expo Go (Android) or Camera app (iOS), or press `a` for Android emulator, `i` for iOS simulator, or `w` for web.

## Project Structure

```
bloom/
├── app/                    # Expo Router screens
│   ├── (onboarding)/       # Onboarding flow
│   │   ├── welcome.tsx
│   │   ├── last-period.tsx
│   │   └── complete.tsx
│   └── (main)/             # Main app tabs
│       ├── home.tsx
│       ├── calendar.tsx
│       └── settings.tsx
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Button, Card
│   │   ├── home/           # Home screen cards
│   │   └── calendar/       # Calendar components
│   ├── store/              # Zustand state management
│   ├── utils/              # Cycle calculation logic
│   ├── types/              # TypeScript interfaces
│   └── constants/          # Theme and colors
└── assets/                 # App icons and images
```

## How Predictions Work

Bloom uses the calendar method for cycle predictions:

- **Ovulation** is estimated to occur 14 days before the next period
- **Fertile window** spans 4 days before to 1 day after ovulation
- Predictions are based on your average cycle length and last period start date

The app automatically detects when a new cycle should have started and prompts you to confirm or log the actual date.

## Testing

Currently, testing is done manually through the Expo development server. To test:

1. Start the app with `npm start`
2. Complete the onboarding flow
3. Verify predictions appear on the home screen
4. Check the calendar view for visual accuracy
5. Test period logging and settings changes

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is open source. See the LICENSE file for details.
