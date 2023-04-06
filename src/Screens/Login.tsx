import React, {useState} from 'react';
import {
  Pressable,
  Text,
  // TextInput,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, fonts, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';
import {ActivityIndicator} from 'react-native-paper';
import {Vibration} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {TextInput} from 'react-native-paper';

export default function Login({navigation}: {navigation: sny}) {
  const [credential, setCredential] = useState<{
    email: string;
    password: string;
  }>({email: '', password: ''});
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loading, setLoading] = useState(false);
  const [creadentialError, setCredentialError] = useState(false);
  const [error, setError] = useState(false);
  const onDismissSnackBar = () => setCredentialError(false);

  console.log(credential);

  const handleLogin = async () => {
    if (credential.email == '' || credential.password == '') {
      setError(true);
      showToastWithGravity('Please Enter all Required Fields');
    } else {
      setLoading(true);
      var backResponse = await fetchBackend('post', '/auth/login', credential);
      setLoading(false);
      if (backResponse) {
        try {
          await AsyncStorage.setItem('loginData', JSON.stringify(backResponse));
          setCredential({});
          setCredentialError(true);
          navigation.navigate(Route.ButtonNavigator);
        } catch (e) {
          console.log('this is login error');
          console.log(e);
        }
      } else {
        showToastWithGravity('Credential Not Matched');
        setCredentialError(true);
      }
    }
  };

  const showToastWithGravity = Message => {
    Vibration.vibrate(40);
    ToastAndroid.showWithGravityAndOffset(
      `${Message}`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      10,
      100,
    );
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-with-line');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-with-line') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={{backgroundColor: '#191C24', flex: 1}}>
      <View>
        <View style={{marginTop: 80, marginHorizontal: 25}}>
          <View>
            <Text style={styles.title}>Hi, Wecome Back! 👋</Text>
            <Text style={styles.subtitle}>
              Hello again, you’ve been missed!
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, color: '#229A7F', fontWeight: '500'}}>
              Email
            </Text>
            <TextInput
              style={[
                {
                  borderRadius: 8,
                  marginTop: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 10,

                  color: 'black',
                },
                error
                  ? {borderBottomColor: 'red', borderBottomWidth: 1}
                  : undefined,
              ]}
              placeholderTextColor={'gray'}
              value={credential?.email}
              onChangeText={text => setCredential({...credential, email: text})}
              placeholder="Please Enter Your Email Address"
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#229A7F', fontWeight: '500'}}>
              Password
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                secureTextEntry={passwordVisibility}
                style={[
                  {
                    backgroundColor: 'white',
                    borderRadius: 8,
                    marginTop: 10,
                    paddingHorizontal: 10,
                    width: '100%',
                    color: 'black',
                  },
                  error
                    ? {borderBottomColor: 'red', borderBottomWidth: 1}
                    : undefined,
                ]}
                placeholder="Please Enter Your password"
                placeholderTextColor={'gray'}
                autoCapitalize="none"
                value={credential?.password}
                onChangeText={text =>
                  setCredential({...credential, password: text})
                }
                autoCorrect={false}
              />

              <TouchableOpacity
                onPress={handlePasswordVisibility}
                style={{
                  marginLeft: -40,
                  marginTop: 22,
                  borderBottomColor: 'blue',
                }}>
                <Entypo name={rightIcon} size={20} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <BouncyCheckbox
                size={20}
                fillColor="#229A7F"
                text="Remember Me"
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{color: 'white', textDecorationLine: 'none'}}
              />
            </View>

            <Text
              onPress={() => {
                navigation.navigate(Route.ButtonNavigator);
              }}
              style={styles.forgotpasstext}>
              Forgot Password ?
            </Text>
          </View>

          <Pressable style={styles.oauthbtn} onPress={() => handleLogin()}>
            <View>
              <Text style={styles.btnText}>
                {loading ? (
                  <ActivityIndicator animating={true} color={'white'} />
                ) : (
                  'login'
                )}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: '400',
          }}>
          Don't Have an Account ?{' '}
          <Text
            onPress={() => {
              navigation.navigate(Route.Signup);
            }}
            style={{
              color: color.Primary,
              fontWeight: 'bold',
            }}>
            Sign Up
          </Text>
        </Text>
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
  title: {fontSize: 30, fontFamily: fonts.bold, color: 'white'},
  subtitle: {color: 'gray', fontSize: 17},
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
    color: color.Secondary,
  },
});
