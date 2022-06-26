# Personal Notes App

Personal notes app using React web with Capacitor for native mobile platforms.

There was no app that did exactly what I wanted to organise my personal notes, so I made this app.

# To build/deploy as a "native" app using Capacitor

## Install node modules

```
cd .\notes-app\
npm install
```

## Install capacitor
```
npm install @capacitor/core @capacitor/cli
npx cap init PersonalNotesApp com.personalnotes.app --web-dir=build
```

## Build the web app
```
npm run build
```

## Install native platforms needed
```
npm i @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios

npx cap copy
npx cap copy web
```

## Deploy

Open the output folder in your chosen native platform IDE and install to device.


# To make changes

After changes made, run:
```
npm run build
npx cap sync
```