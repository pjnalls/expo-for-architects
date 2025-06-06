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

## Tutorial for This Project

Please feel free to use the tutorial available [here](tutorial/00_overview_of_expo_for_architects.md) for this project to get use to the entire full-stack cross-platform machine learning application.

## Cloning Repo with Submodule
This repo has a submodule so you'll need to clone it recursively with the following command:
```bash
$ git clone git@github.com:pjnalls/expo-for-architects.git --recursive
```

## Expo `app/` Prerequisites

- Python 3 available for download here: https://www.python.org/downloads/
- `nvm` (Node Version Manager) and the long-term supported (LTS) verion of Node.js (I'm using Node 22.14), which you can download here: https://nodejs.org/en/download.
- `npm`
- iOS Simulator (for Mac) and/or Android Emulator OR an physical iOS or Android device with the Expo Go app installed.
- `eas` for creating Expo builds which you can install with the following command:
```bash
npm install -g eas-cli
```

## Installing Dependencies

### Adding `app/` Dependencies
Run the following command from the root of the project:
```bash
npm install
```

### Adding `api/` Dependencies
Nativigate to the `api/` project with the following command:
```bash
cd api
```
Then, run the following command:
```bash
npm install
```

### Adding `api/nlp_from_scratch` Dependencies

#### (Recommended) Create a virtual environment 

Generate a new `.venv` with the following command:
```bash
python -m venv .venv
```
Activate the new virual environment `.venv` with the following command:
```bash
source .venv/bin/acitivate
```

#### Adding `api/nlp_from_scratch/` Dependencies
```bash
pip install -r requirements.txt
```

## Express `api/` Prerequisites
Please see the `README.md` for setting up and running the Express and Flask APIs.

## ⚠️ Development Builds Needed for Expo Maps ⚠️
***IMPORTANT NOTE: You need to run development builds for iOS and Android to get Expo Maps to work***

Make a development build for iOS devices run with the command below:
```bash
eas build --platform ios --profile development
```

Make a development build for Android devices run with the command below:
```bash
eas build --platform android --profile development
```

Make a development build for all platforms run with the command below:
```bash
eas build --platform all --profile development
```

## Running Entire Project
Let's get access to the full-stack cross-platform Expo app and it's machine learning features ✨.

### Starting the Project
You are going to need two separate terminals, whether through a integrated or seperate from your code editor.

#### Starting the Express API
First, open a new terminal and navigate to the `api/` subproject from the root of this repo with the following command:
```bash
cd api
```
Next, once all depedencies for the the subproject are install and ready to run, run the API project with the following command:
```bash
npm start
```

#### Starting the Expo App
Second, in a seperate terminal in the root of this repo, run the following command:
```bash
npm start
```
### Running the Expo App

#### On iOS
Scan the barcode that appears (you may need to scroll back up) in the terminal for the Expo app if you have a physical iOS device, or simply press "i" if you have an iOS simulator on your Mac open.

#### On Android
Scan the barcode that appears (you may need to scroll back up) in the terminal for the Expo app if you have a physical Android device, or simply press "a" if you have an iOS simulator on your Mac open.

#### On the Web
Simply press "w" if you have an iOS simulator on your Mac open.

## Project Structure

```
├── api/              # Backend RESTful APIs
├── app/              # Main application screens
├── assets/           # Static assets
├── components/       # Reusable UI components
├── contexts/         # React Context providers
├── hooks/            # React Hook dynamic schemes
├── scripts/          # Development utility scripts 
└── types/            # Types throughout solution
```

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are properly installed
2. Clear the Metro bundler cache: `npx expo start -c`
3. Delete your `node_modules/` folder and reinstall the project dependencies for either the Expo app or AI subproject with the command `npm install`.

