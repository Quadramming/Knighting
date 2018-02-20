rm -rf compiled/*
rm release.apk

node buildScripts/qqEngineInclude.js
node buildScripts/releaseHtml.js
node buildScripts/jsToCompiled.js
#node buildScripts/jsToIndex.js # TO FIX
buildScripts/compiledToRelease.sh

cp -RL htmlRoot/css    compiled/css
cp -RL htmlRoot/fonts  compiled/fonts
cp -RL htmlRoot/imgs   compiled/imgs
cp -RL htmlRoot/sounds compiled/sounds
cp node_modules/babel-polyfill/dist/polyfill.min.js compiled/polyfill.min.js

rm -rf cordova/www/*
cp -RL compiled/* cordova/www

cd cordova
cordova build android --release
cordova build android --debug
cd ..

cp cordova/platforms/android/app/build/outputs/apk/release/*.apk apk
cp cordova/platforms/android/app/build/outputs/apk/debug/*.apk apk
#cp cordova/platforms/android/build/outputs/apk/*.apk apk

zipalign -p 4 apk/app-release-unsigned.apk release.apk
#zipalign -p 4 apk/android-release-unsigned.apk release.apk
$ANDROID_HOME/build-tools/27.0.3/apksigner sign --ks sign/my.keystore release.apk

