  Run instructions for iOS:
    • cd /home/re/Documents/research/react-native/AwesomeProject && npx react-native run-ios
    - or -
    • Open AwesomeProject/ios/AwesomeProject.xcodeproj in Xcode or run "xed -b ios"
    • Hit the Run button

  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd /home/re/Documents/research/react-native/AwesomeProject && npx react-native run-android

https://www.techomoro.com/how-to-install-and-setup-react-native-on-ubuntu-18-04-1-lts-bionic-beaver/

Create devices in Android Studio 
Install adb
Add android/local.properties: 
  sdk.dir=/home/re/Android/Sdk
Accept licenses : 
  cd /Android/Sdk/tools/bin
  ./sdkmanager --licenses

react-native run-android
yarn start