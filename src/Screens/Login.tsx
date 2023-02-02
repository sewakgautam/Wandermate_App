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
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import {Route} from '../config/constraint';

export default function Login({navigation}) {
  const windowHeight = useWindowDimensions().height;
  const [credential, setCredential] = useState<{
    email: string;
    password: string;
  }>({email: '', password: ''});
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  console.log(credential);

  const handleLogin = () => {
    const data = credential;
    axios({
      method: 'POST',
      url: `http://10.0.0.25:3000/auth/login`,
      data,
    })
      .then(res => {
        console.log(res.data);
        if (res.data?.jwt) {
          navigation.navigate(Route.Home);
        }
      })
      .catch(err => {
        console.log(err);
      });
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
        {minHeight: Math.round(windowHeight)},
      ]}>
      <View>
        <View style={{marginTop: 80, marginHorizontal: 25}}>
          <View>
            <Text style={styles.title}>Hi, Wecome Back! 👋</Text>
            <Text style={styles.subtitle}>
              Hello again, you’ve been missed!
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, color: '#183E80', fontWeight: '500'}}>
              Email
            </Text>
            <TextInput
              style={[
                {
                  borderRadius: 8,
                  marginTop: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  color: 'black',
                },
              ]}
              value={credential?.email}
              onChangeText={text => setCredential({...credential, email: text})}
              placeholder="Please Enter Your Email Address"
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#183E71', fontWeight: '500'}}>
              Password
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                secureTextEntry={passwordVisibility}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  marginTop: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  width: '100%',
                  color: 'black',
                }}
                placeholder="Please Enter Your Password"
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
                fillColor="#183E71"
                text="Remember Me"
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{color: 'white', textDecorationLine: 'none'}}
                // onPress={(isChecked: boolean) => {}}
              />
            </View>

            <Text
              onPress={() => {
                navigation.navigate(Route.Home);
              }}
              style={styles.forgotpasstext}>
              Forgot Password ?
            </Text>
          </View>

          <Pressable style={styles.oauthbtn} onPress={() => handleLogin()}>
            <View>
              <Text style={styles.btnText}>Login</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={{alignSelf: 'center', fontWeight: '400'}}>
          Don't Have an Account ?{' '}
          <Text
            onPress={() => {
              navigation.navigate(Route.Signup);
            }}
            style={{color: '#183E71', fontWeight: 'bold'}}>
            SignIn
          </Text>
        </Text>
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
    color: 'black',
  },
});
