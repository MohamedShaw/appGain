/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppgainSDK from 'react-native-appgain-sdk-library';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      //  alert("You can use the location");
    } else {
      console.log('location permission denied');
      // alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const projectId = '5ff07623da4e440011a73596';
const apiKey =
  '0943f1f75a024b0df160128c5ff34ddfba52f2b6573d038378fe98943b8ac067';
const App: () => React$Node = () => {
  const initSdk = async () => {
    console.log('init --->>');

    try {
      await AppgainSDK.initSDK(projectId, apiKey, true);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  useEffect(async () => {
    requestLocationPermission();
    await initSdk();
    getUser();
    deepLink();
  }, []);
  const getUser = async () => {
    try {
      const user = await AppgainSDK.getUserId();
      console.log('user', user);
    } catch (error) {}
  };

  const deepLink = async () => {
    try {
      let result = await AppgainSDK.matchLink();
      console.log('response  ', result);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>App Gain Sdk</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
