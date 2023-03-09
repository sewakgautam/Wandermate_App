import React from 'react';
import {color, Route} from '../config/constraint';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from './Home';
import Profile from './Profile';
import Maps from './Maps';
import Plans from './Plans';
import Qrscan from './Qrscan';
import {Alert, BackHandler, Vibration} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export default function ButtonNavigator({navigation}) {
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Exit Wandermate?',
          'Are You Sure You want to Exit wandermate?',
          [
            {text: 'No', style: 'cancel', onPress: () => {}},
            {
              text: 'Yes',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
      }),
    [navigation],
  );
  return (
    // <>
    <Tab.Navigator
      initialRouteName={Route.Login}
      activeColor={color.Primary}
      inactiveColor="#A1B1C5"
      barStyle={{backgroundColor: color.Tabs}}>
      <Tab.Screen
        listeners={() => ({
          tabPress: () => {
            Vibration.vibrate(1);
          },
        })}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <MaterialCommunityIcons name="home" color={color} size={24} />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={24}
              />
            ),
        }}
        name={Route.Home}
        component={HomePage}
      />
      <Tab.Screen
        listeners={() => ({
          tabPress: () => {
            Vibration.vibrate(1);
          },
        })}
        options={{
          tabBarLabel: 'Plan',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <MaterialCommunityIcons name="notebook" color={color} size={24} />
            ) : (
              <MaterialCommunityIcons
                name="notebook-outline"
                color={color}
                size={24}
              />
            ),
        }}
        name={Route.Plans}
        component={Plans}
      />
      <Tab.Screen
        listeners={() => ({
          tabPress: () => {
            Vibration.vibrate(1);
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={40}
              style={{
                height: 60,
                width: 60,
                borderRadius: 10,
                backgroundColor: color.Primary,
                padding: 10,
                color: 'white',
                margin: -10,
              }}
            />
          ),
        }}
        name={Route.Qr}
        component={Qrscan}
      />
      <Tab.Screen
        listeners={() => ({
          tabPress: () => {
            Vibration.vibrate(1);
          },
        })}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <MaterialCommunityIcons name="map" color={color} size={24} />
            ) : (
              <MaterialCommunityIcons
                name="map-outline"
                color={color}
                size={24}
              />
            ),
        }}
        name={Route.Maps}
        component={Maps}
      />
      <Tab.Screen
        listeners={() => ({
          tabPress: () => {
            Vibration.vibrate(1);
          },
        })}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <MaterialCommunityIcons name="account" color={color} size={24} />
            ) : (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={24}
              />
            ),
        }}
        name={Route.profile}
        component={Profile}
      />
    </Tab.Navigator>
    // </>
  );
}
