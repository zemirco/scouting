## Infos

`node_modules/` folder is not included in repository. To install missing packages run `npm install`.

`selenium/` folder is not included to save space. It contains:

 - chromedriver
 - chromedriver_mac32_2.2.zip
 - selenium-server-standalone-2.35.0.jar
 - start

`phonegap/` folder is also not included to save space and keep the repo as simple as possible.
The following [plugins](http://docs.phonegap.com/en/3.3.0/guide_cli_index.md.html) are required:

 - console `cordova plugin add org.apache.cordova.console`
 - [dialogs](http://docs.phonegap.com/en/3.3.0/cordova_notification_notification.md.html#Notification) `cordova plugin add org.apache.cordova.dialogs`

## Create an app

1. Run `grunt ios` to create HTML / CSS files and copy them to the `cordova/.../www` folder
2. Use cordova to create the app `cordova build ios`
3. Open Xcode and start the app inside the emulator