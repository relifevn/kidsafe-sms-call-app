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
      DirectCall.call('(+84)387358924');
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
      <SafeAreaView styke={styles.container}>
        <TouchableOpacity style={styles.sendSMS} onPress={this._sendSMS}>
          <Text>Send SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.call} onPress={this._call}>
          <Text>Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  sendSMS: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  call: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
});

export default App;
