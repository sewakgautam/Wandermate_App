import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {ActivityIndicator} from 'react-native-paper';

import {color, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';

export default function Otp({navigation, route}) {
  const [otps, setOtp] = useState<{email: string; OTP: string}>({});
  useEffect(() => {
    setOtp({...otps, email: route.params.email});
  }, []);
  // console.log(otps);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const verifyOtp = await fetchBackend('patch', '/auth/otpverify', otps);
    if (verifyOtp) {
      setLoading(false);
      navigation.navigate(Route.ButtonNavigator, route.params);
    }
    setLoading(false);
  };
  return (
    <View
      style={[
        {
          flex: 1,
          position: 'relative',
          backgroundColor: color.Background,
        },
      ]}>
      <View>
        <View style={{marginTop: 80, marginHorizontal: 25}}>
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <Image
              source={{
                uri: 'https://cdni.iconscout.com/illustration/premium/thumb/otp-authentication-security-5053897-4206545.png',
              }}
              style={{height: 200, width: 200}}
            />
            <Text style={styles.title}> Enter Your Verification Code</Text>
            <Text style={styles.subtitle}>We Send a Verification Code to</Text>
            <Text
              style={{color: color.Primary, fontWeight: 'bold', fontSize: 20}}>
              {route.params.email}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 40,
              flexDirection: 'row',
            }}>
            <OtpInputs
              autofillFromClipboard={false}
              handleChange={code => setOtp({...otps, OTP: code})}
              numberOfInputs={4}
              inputStyles={[
                {
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  height: 50,
                  width: 50,
                  backgroundColor: '#e6fced',
                  color: 'black',
                },
              ]}
            />
          </View>
          <Pressable
            onPress={() => {
              handleSubmit();
            }}
            style={styles.oauthbtn}>
            <View>
              <Text style={styles.btnText}>
                {loading ? (
                  <ActivityIndicator animating={true} color={'white'} />
                ) : (
                  'Verify'
                )}
              </Text>
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
    </View>
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
    backgroundColor: color.Primary,
  },
  titletextparent: {
    marginHorizontal: 24,
    marginTop: -100,
  },
  title: {fontSize: 30, fontWeight: '700', color: color.Primary},
  subtitle: {color: '#F7F6F9', fontSize: 17},
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
