/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import Login from './Screens/Login';
import {Main} from './Screens/Main';
import Oauthlogin from './Screens/Oauthlogin';
import Onboard from './Screens/Onboard';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from './config/constraint';
import HomePage from './Screens/Home';
import Signup from './Screens/Signup';
import SignupBasicInformation from './Screens/BasicInfrormation';
import Otp from './Screens/Otp';
import ButtonNavigator from './Screens/ButtonNavigator';
import Plans from './Screens/Plans';
import Maps from './Screens/Maps';
import Profile from './Screens/Profile';
import Qrscan from './Screens/Qrscan';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={Route.OnBoard}>
          <Stack.Screen
            name={Route.ButtonNavigator}
            component={ButtonNavigator}
          />
          <Stack.Screen name={Route.OnBoard} component={Onboard} />
          <Stack.Screen name={Route.Qr} component={Qrscan} />
          <Stack.Screen name={Route.Plans} component={Plans} />
          <Stack.Screen name={Route.Maps} component={Maps} />
          <Stack.Screen name={Route.profile} component={Profile} />
          <Stack.Screen name={Route.oauthscrean} component={Oauthlogin} />
          <Stack.Screen name={Route.Home} component={HomePage} />
          <Stack.Screen name={Route.Login} component={Login} />
          <Stack.Screen name={Route.Signup} component={Signup} />
          <Stack.Screen name={Route.OTP} component={Otp} />

          <Stack.Screen
            name={Route.SignupInformation}
            component={SignupBasicInformation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
