import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import {color, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';

export default function SignupBasicInformation({navigation, route}) {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    password: string;
    name: string;
    country: string;
    number: string;
  }>({});

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      email: route.params.email,
      password: route.params.password,
    });
  }, []);

  console.log(userInfo);
  const windowHeight = useWindowDimensions().height;

  const handleSignup = async () => {
    const signUpdata = await fetchBackend('post', '/auth/register', userInfo);

    if (signUpdata && signUpdata?.email) {
      navigation.navigate(Route.OTP, signUpdata);
    }
    console.log('this is from signup data', signUpdata);
  };

  return (
    <View
      style={[
        {
          flex: 1,
          position: 'relative',
          backgroundColor: color.Background,
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
            <Text
              style={{fontSize: 18, color: color.Primary, fontWeight: '500'}}>
              Full Name
            </Text>
            <TextInput
              style={[
                {
                  borderRadius: 8,
                  marginTop: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  color: 'black',

                  paddingVertical: 8,
                },
              ]}
              placeholderTextColor={'gray'}
              placeholder="Please Enter Full Name"
              onChangeText={t => setUserInfo({...userInfo, name: t})}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{fontSize: 18, color: color.Primary, fontWeight: '500'}}>
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
                  color: 'black',

                  width: '100%',
                }}
                placeholderTextColor={'gray'}
                placeholder="Please Enter Your Native Country"
                onChangeText={t => setUserInfo({...userInfo, country: t})}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              onPress={() => navigation.navigate(Route.OTP, {})}
              style={{fontSize: 18, color: color.Primary, fontWeight: '500'}}>
              Contact Number
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginTop: 10,
                  color: 'black',

                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                placeholder="Please Enter your Contact Number"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                onChangeText={t => setUserInfo({...userInfo, number: t})}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          />

          <Pressable
            style={styles.oauthbtn}
            onPress={() => {
              handleSignup();

              // navigation.navigate(Route.OTP);
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={styles.btnText}>Sign Up</Text>
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
  title: {fontSize: 30, color: color.Primary, fontWeight: '700'},
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
