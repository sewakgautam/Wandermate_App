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
import {QueryClient, QueryClientProvider} from 'react-query';
import {Text} from 'react-native';
import {PackageDetail} from './Screens/packages';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
function App(): JSX.Element {
  const config = {
    screens: {
      Qr: 'qr',
    },
  };
  const linking = {
    prefixes: ['wm://', 'https://wandermate.me'],
    config,
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={color.Accent} />
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <QueryClientProvider client={queryClient}>
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
            <Stack.Screen
              options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: '#fff',
              }}
              name={Route.Signup}
              component={Signup}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: '#fff',
              }}
              name={Route.OTP}
              component={Otp}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: '300',
                },
                headerStyle: {
                  backgroundColor: color.Background,
                },
              }}
              name={Route.Heritage}
              component={HeritagePage}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: '300',
                },
                headerStyle: {
                  backgroundColor: color.Background,
                },
              }}
              name={Route.Package}
              component={PackageDetail}
            />
            <Stack.Screen
              name={Route.Personalinfo}
              component={Personalinfo}
              options={{
                headerShown: true,
                title: 'Edit your Info',
                headerStyle: {
                  backgroundColor: color.Background,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '300',
                },
              }}
            />
            <Stack.Screen
              name={Route.Aboutpage}
              component={AboutUs}
              options={{
                headerShown: true,
                title: 'Wandermate',
                headerStyle: {
                  backgroundColor: '#183E80',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '300',
                },
              }}
            />
            <Stack.Screen
              name={Route.ChangePassword}
              component={ChangePassword}
              options={{
                headerShown: true,
                title: 'Change Password',
                headerStyle: {
                  backgroundColor: '#183E80',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '300',
                },
              }}
            />
            <Stack.Screen
              name={Route.SignupInformation}
              component={SignupBasicInformation}
            />
            <Stack.Screen
              name={Route.Helpandsupport}
              component={HelpAndSupport}
              options={{
                headerShown: true,
                title: 'Help and Support',
                headerStyle: {
                  backgroundColor: '#183E80',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '300',
                },
              }}
            />
            <Stack.Screen
              name={Route.Weather}
              component={Weather}
              options={{
                headerShown: true,
                title: 'Weather Update',
                headerStyle: {
                  backgroundColor: color.Background,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '300',
                },
              }}
            />
            <Stack.Screen
              name={Route.Currency}
              component={CurrencyConvert}
              options={{
                headerShown: true,
                title: 'Forex Exchange',
                headerTransparent: true,

                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '300',
                },
              }}
            />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
