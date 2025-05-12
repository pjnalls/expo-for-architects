<br/>
<div align="center">
   <img alt="atom with brain" src="assets/images/splash-icon.png" width="120px"/>
</div>
<br/>
<h1 align="center">
   React Native Preply Tutorial
   <br/>
   <br/>
</h1>

This project is a React Native application built with Expo that includes features like cat facts, maps, and user registration. Below is a step-by-step guide to build the solution.

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator

## Step-by-Step Build Guide

### 1. Initial Setup

```bash
# Create a new Expo project
npx create-expo-app@latest .
```

### 2. Install Core Dependencies

```bash
# Install React Native Maps
npx expo install react-native-maps
```

Follow [this guide](https://www.nativewind.dev/docs/getting-started/installation#installation-with-expo) for installing and configuring NativeWind for styling

### 3. Project Structure Setup

The project follows a component-based architecture with the following main features:

- Cat Facts Feature
- Registration Flow
- Map Integration
- API Integration

### 4. Feature Implementation Order

1. **Cat Facts Feature**

   - Implement basic cat facts component
   - Add infinite scroll for flat list
   - Create checkboxes for different breeds
   - Add search bar component
   - Make cat facts pressable and viewable

2. **UI Components**

   - Add accordion component
   - Implement reusable button component
   - Create date picker component
   - Add progress bar for registration

3. **Registration Flow**

   - Create enter, review & success subscreens
   - Add validation to main registration form
   - Implement map for explore screen

4. **API Integration**
   - Set up Express project
   - Implement API endpoints
   - Handle JSON parameters
   - Fix request body handling

### 5. Running the Application

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

## Project Structure

```
├── components/       # Reusable UI components
├── app/              # Main application screens
├── api/              # Backend API implementation
├── context/          # React Context providers
├── types/            # Types throughout solution
└── assets/           # Static assets
```

## Key Features

- Cat Facts browsing with infinite scroll
- User registration with multi-step form
- Interactive map integration
- Dark/Light theme support
- Responsive UI components
- API integration with Express backend

## Development Notes

- The project uses NativeWind for styling
- React Native Maps is used for map functionality
- Express is used for the backend API
- The application follows a component-based architecture
- State management is handled through React Context

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are properly installed
2. Clear the Metro bundler cache: `npx expo start -c`
3. Check that your development environment is properly configured
4. Verify that all required environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
