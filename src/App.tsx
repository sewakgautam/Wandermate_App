/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Login from './Screens/Login';
import {Main} from './Screens/Main';
import Oauthlogin from './Screens/Oauthlogin';
import Onboard from './Screens/Onboard';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {color, Route} from './config/constraint';
import HomePage from './Screens/Home';
import Signup from './Screens/Signup';
import SignupBasicInformation from './Screens/BasicInfrormation';
import Otp from './Screens/Otp';
import ButtonNavigator from './Screens/ButtonNavigator';
import Plans from './Screens/Plans';
import Maps from './Screens/Maps';
import Profile from './Screens/Profile';
import Qrscan from './Screens/Qrscan';
import {HeritagePage} from './Screens/HeritagePage';
import {Weather} from './Screens/Weather';
import {Personalinfo} from './Screens/profle/PersonalInfo';
import {AboutUs} from './Screens/profle/AboutApp';
import {ChangePassword} from './Screens/profle/ChangePassword';
import {HelpAndSupport} from './Screens/profle/HelpSupport';
import {CurrencyConvert} from './Screens/profle/CurrencyConverter';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={color.Accent} />
            <Stack.Screen name={Route.Qr} component={Qrscan} />

              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '300',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
