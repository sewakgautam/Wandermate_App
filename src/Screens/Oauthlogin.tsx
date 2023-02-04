import React from 'react';
import {Text, StyleSheet, View, Image, Pressable, Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Route} from '../config/constraint';

export default function Oauthlogin({navigation}) {
  const signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '367910959379-bgtc0fo0tko1hmctn3umhpnki15kdmcm.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({userInfo});
      console.log(userInfo);
      if (userInfo) {
        navigation.navigate(Route.ButtonNavigator);
      }
    } catch (error) {
      Alert.alert(
        'We will Grand you offline access this time ',
        'Offline access is a pro feature, but we will let you try it out just this time',
      );
      console.log(error);
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
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
      <View style={{gap: 20, alignItems: 'center'}}>
        <Pressable style={styles.oauthbtn} onPress={() => signIn()}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
              }}
              style={{height: 20, width: 20, marginHorizontal: 10}}
            />

            <Text style={styles.btnText}>Sign Up With Google</Text>
          </View>
        </Pressable>
        <Text
          onPress={() => navigation.navigate(Route.Login)}
          style={{color: 'black'}}>
          More Sign in Options
        </Text>
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
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 30,
    borderColor: '#22292f',
  },
  titletextparent: {
    marginHorizontal: 30,
    marginTop: -100,
  },
  title: {fontSize: 36, fontWeight: '700', color: 'black'},
  subtitle: {color: 'black'},
  btnText: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'black',
  },
});
