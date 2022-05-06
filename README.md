# Personal Notes app

Personal notes app using React web.

# To build/deploy as a "native" app using Capacitor

## Install node modules

```
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
npm i @capacitor/ios @capacitor/android
npx cap add android
npx cap add ios
```

## Deploy

Open the output folder in your chosen native platform IDE and install to device.


# To make changes

After changes made, run:
```
npm run build
npx cap sync
```