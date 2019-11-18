/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import io from 'socket.io-client';
import { environment } from './config/environment';

import { NativeModules } from 'react-native';
var DirectSms = NativeModules.DirectSms;
var DirectCall = NativeModules.DirectCall;

import SendSMS from 'react-native-sms'

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.socket = io(environment.serverUrl);

    this.socket.on('vehicles-result', (data) => {
      console.log('DATA received from server', data);
    });
  }

  _sendSMS = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'YourProject App Sms Permission',
          message:
            'YourProject App needs access to your inbox ' +
            'so you can send messages in background.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DirectSms.sendDirectSms('0387358924', 'This is a direct message');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  _call = async () => {
    try {
      // const granted_MANAGE_OWN_CALLS = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.MANAGE_OWN_CALLS,
      //   {
      //     title: 'YourProject App Call Permission',
      //     message:
      //       'YourProject App needs access to your inbox ' +
      //       'so you can send messages in background.',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      //   },
      // );
      // const granted_READ_CALL_LOG = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      //   {
      //     title: 'YourProject App Call Permission',
      //     message:
      //       'YourProject App needs access to your inbox ' +
      //       'so you can send messages in background.',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      //   },
      // );
      // const granted_READ_PHONE_STATE = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      //   {
      //     title: 'YourProject App Call Permission',
      //     message:
      //       'YourProject App needs access to your inbox ' +
      //       'so you can send messages in background.',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      //   },
      // );
      // if (granted_MANAGE_OWN_CALLS === PermissionsAndroid.RESULTS.GRANTED
      //   && granted_READ_CALL_LOG === PermissionsAndroid.RESULTS.GRANTED
      //   && granted_READ_PHONE_STATE === PermissionsAndroid.RESULTS.GRANTED) {
      //   DirectCall.call('0387358924');
      // } else {
      //   console.log('SMS permission denied');
      // }
      DirectCall.call('0387358924');
    } catch (err) {
      console.warn(err);
    }
  }

  /* Deprecated */
  sendSMS = () => {
    SendSMS.send({
      body: 'The default body of the SMS!',
      recipients: ['0387358924'],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {

      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

    });
  }

  _onPress = () => {
    this.socket.emit('select-school', { key: 'school_1' });
  }

  componentDidMount() {
  }


  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity style={{ backgroundColor: 'green', alignSelf: 'center' }} onPress={this._sendSMS}>
          <Text>Send SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'green', alignSelf: 'center' }} onPress={this._call}>
          <Text>Call</Text>
        </TouchableOpacity>
        {/* <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  asa <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then fsdf back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView> */}
      </SafeAreaView>
    );
  }
}

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
