import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, Pressable, Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {color, fonts, Route} from '../config/constraint';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Oauthlogin({navigation}: {navigation: any}) {
  // const [userInfo, setUserInfo] = useState({any});
  const signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '367910959379-bgtc0fo0tko1hmctn3umhpnki15kdmcm.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo);
      console.log(userInfo);

      if (userInfo) {
        navigation.navigate(Route.ButtonNavigator);
      }
    } catch (error) {
      Alert.alert(
        'We Cannot Give Grand you offline access this time ',
        'Offline access is a pro feature, Without Internet Our System cannot Perform well',
      );
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      let value = await AsyncStorage.getItem('loginData');
      value = JSON.parse(value);
      if (value?.jwt) {
        navigation.navigate(Route.ButtonNavigator);
      } else {
        console.log('User Not loggedin');
      }
    })();
  });
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <View>
        <Image
          source={require('../../assets/img/DesignAsset/OnboardOauth.png')}
          style={styles.topimage}
        />
      </View>
      <View style={styles.titletextparent}>
        <Text style={styles.title}>Sign In to Start Your Journey</Text>
        <Text style={styles.subtitle}>
          By proceeding, you agree to our Terms of Use and confrim you have read
          our Privacy and Cookie Statement.
        </Text>
      </View>
      <View style={{gap: -10, alignItems: 'center'}}>
        <Pressable
          style={[styles.oauthbtn, {backgroundColor: color.Primary}]}
          onPress={() => navigation.navigate(Route.Login)}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="email"
              style={{height: 20, width: 25, marginHorizontal: 10}}
              color={color}
              size={24}
            />

            <Text style={styles.btnText}>Continue With Email</Text>
          </View>
        </Pressable>
        <Pressable style={[styles.oauthbtn]} onPress={() => signIn()}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
              }}
              style={{height: 20, width: 20, marginHorizontal: 10}}
            />

            <Text style={styles.btnText}>Continue With Google</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topimage: {
    width: '100%',
    height: '80%',
    marginTop: -45,
  },
  oauthbtn: {
    marginTop: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 30,
    borderColor: color.Primary,
  },
  titletextparent: {
    marginHorizontal: 30,
    marginTop: -130,
  },
  title: {fontSize: 36, color: color.Primary, fontFamily: fonts.bold},
  subtitle: {marginTop: 5, fontFamily: fonts.light},
  btnText: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '700',
    letterSpacing: 0.25,
  },
});
