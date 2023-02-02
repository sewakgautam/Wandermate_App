import React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

import {Route} from '../config/constraint';

export default function Otp({navigation}) {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1492584328860-c0c7bb599679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      }}
      imageStyle={{opacity: 0.6, backgroundColor: 'white'}}
      style={[
        {
          flex: 1,
          position: 'relative',
        },
      ]}>
      <View>
        <View style={{marginTop: 80, marginHorizontal: 25}}>
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.subtitle}>
              We Will send you a one time password on this Email Address
            </Text>
            <Text style={styles.subtitle}>sewak.gautam58@gmail.com</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TextInput
              keyboardType="number-pad"
              textAlign="center"
              cursorColor="white"
              style={[
                {
                  borderRadius: 100,
                  marginTop: 10,
                  fontSize: 20,
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                  color: 'black',
                },
              ]}
            />
            <TextInput
              keyboardType="number-pad"
              textAlign="center"
              cursorColor="white"
              style={[
                {
                  borderRadius: 100,
                  marginTop: 10,
                  fontSize: 20,
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                  color: 'black',
                },
              ]}
            />
            <TextInput
              keyboardType="number-pad"
              textAlign="center"
              cursorColor="white"
              style={[
                {
                  borderRadius: 100,
                  marginTop: 10,
                  fontSize: 20,
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                  color: 'black',
                },
              ]}
            />
            <TextInput
              keyboardType="number-pad"
              textAlign="center"
              cursorColor="white"
              style={[
                {
                  borderRadius: 100,
                  marginTop: 10,
                  fontSize: 20,
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                  color: 'black',
                },
              ]}
            />
          </View>
          <Pressable style={styles.oauthbtn}>
            <View>
              <Text style={styles.btnText}>Submit</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Image
          source={require('../../assets/img/DesignAsset/footer.png')}
          style={styles.footer}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  oauthbtn: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#183E71',
    borderColor: '#183E71',
  },
  titletextparent: {
    marginHorizontal: 24,
    marginTop: -100,
  },
  title: {fontSize: 30, fontWeight: '700', color: 'black'},
  subtitle: {color: 'black', fontSize: 17},
  btnText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    alignContent: 'center',
    color: 'white',
  },
  footer: {
    resizeMode: 'cover',
    height: 90,
    width: '100%',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  forgotpasstext: {
    color: 'black',
  },
});
