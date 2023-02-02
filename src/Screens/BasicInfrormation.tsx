import React, {useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {Route} from '../config/constraint';

export default function SignupBasicInformation({navigation}) {
  const windowHeight = useWindowDimensions().height;

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1550850603-645ae3c6c387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      }}
      imageStyle={{opacity: 0.6}}
      style={[
        {
          flex: 1,
          position: 'relative',
        },
        {minHeight: Math.round(windowHeight)},
      ]}>
      <View>
        <View style={{marginTop: 80, marginHorizontal: 25}}>
          <View>
            <Text style={styles.title}>Your Basic Information </Text>
            <Text style={styles.subtitle}>
              Connect with Nepal and Neplease friends today!
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, color: '#183E71', fontWeight: '500'}}>
              Full Name
            </Text>
            <TextInput
              style={[
                {
                  borderRadius: 8,
                  marginTop: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                },
                {},
              ]}
              placeholder="Please Enter Your Email Address"
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#183E71', fontWeight: '500'}}>
              Nationality
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginTop: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                placeholder="Please Enter Your Password"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#183E71', fontWeight: '500'}}>
              Contact Number
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginTop: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                placeholder="Please Enter your Contact Number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}></View>

          <Pressable
            style={styles.oauthbtn}
            onPress={() => {
              navigation.navigate(Route.OTP);
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={styles.btnText}>Next</Text>
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
    borderColor: '#C6C6C6',
  },
  titletextparent: {
    marginHorizontal: 24,
    marginTop: -100,
  },
  title: {fontSize: 30, fontWeight: '700'},
  subtitle: {color: '#AA9EA1', fontSize: 17},
  btnText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
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
    color: 'red',
  },
});
