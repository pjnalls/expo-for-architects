<br/>
<div align="center">
   <img 
      alt="atom with protractor" 
      src="assets/images/splash-icon.png"
      width="240px"
   />
</div>

<h1 align="center">
   Expo for Architects 📐
</h1>

<h3 align="center">
An example fullstack cross-platform application with machine learning integrations for iOS, Android and the Web.
<hr>
</h3>

## Expo `app/` Prerequisites

- `nvm` (Node Version Manager) and the long-term supported (LTS) verion of Node.js (I'm using Node 22.14), which you can download here: https://nodejs.org/en/download.
- `npm`
- iOS Simulator (for Mac) and/or Android Emulator OR an physical iOS or Android device with the Expo Go app installed.

## Express `api/` Prerequisites
Please see the `README.md` for setting up and running the Express and Flask APIs.

## Running Entire Project
Let's get access to the full-stack cross-platform Expo app and it's machine learning features ✨.

### Starting the Project
You are going to need two separate terminals, whether through a integrated or seperate from your code editor.

#### Starting the Express API
First, open a new terminal and navigate to the `api/` subproject from the root of this repo with the following command:
```bash
$ cd api
```
Next, once all depedencies for the the subproject are install and ready to run, run the API project with the following command:
```bash
api $ npm start
```

#### Starting the Expo App
Second, in a seperate terminal in the root of this repo, run the following command:
```bash
$ npm start
```
### Running the Expo App

#### On iOS
Scan the barcode that appears (you may need to scroll back up) in the terminal for the Expo app if you have a physical iOS device, or simply press "i" if you have an iOS simulator on your Mac open.

#### On Android
Scan the barcode that appears (you may need to scroll back up) in the terminal for the Expo app if you have a physical Android device, or simply press "a" if you have an iOS simulator on your Mac open.

### On the Web
Simply press "w" if you have an iOS simulator on your Mac open.

## Step-by-Step Build Guide

### 1. Initial Setup

```bash
# Create a new Expo project
npx create-expo-app@latest .
```

### 2. Install Core Dependencies

#### Install NativeWind
Follow the guide for installing and configuring NativeWind for styling available in the offical NativeWind documentation here: https://www.nativewind.dev/docs/getting-started/installation#installation-with-expo

#### Install React Native Maps
```bash
npx expo install react-native-maps
```



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
