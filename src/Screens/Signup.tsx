import React, {useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Vibration,
  ToastAndroid,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';

export default function Signup({navigation}: {navigation: any}) {
  const windowHeight = useWindowDimensions().height;
  const [credential, setCredential] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loading, setLoading] = useState(false);

  const showToastWithGravity = (Message: any) => {
    Vibration.vibrate(40);
    ToastAndroid.showWithGravityAndOffset(
      `${Message}`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      10,
      100,
    );
  };

  const handleSignup = async () => {
    if (!credential.name || !credential.password || !credential.password) {
      showToastWithGravity('Please Input All Required Fields');
    } else {
      setLoading(true);
      const signUpdata = await fetchBackend(
        'post',
        '/auth/register',
        credential,
      );
      console.log(signUpdata);

      if (signUpdata && signUpdata?.email) {
        setLoading(false);
        navigation.navigate(Route.OTP, signUpdata);
      } else {
        setLoading(false);
      }
      showToastWithGravity(signUpdata?.message);
      console.log('this is from signup data', signUpdata);
      setLoading(false);
    }
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
            <Text style={styles.title}>Create an Account </Text>
            <Text style={styles.subtitle}>
              Explore Nepal for lifetimes experiences.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{fontSize: 18, color: color.Primary, fontWeight: '500'}}>
              Name
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
              onChangeText={t => setCredential({...credential, name: t})}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{fontSize: 18, color: color.Primary, fontWeight: '500'}}>
              Email Address
            </Text>
            <TextInput
              placeholderTextColor={'gray'}
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
              onChangeText={t => {
                setCredential({...credential, email: t});
              }}
              placeholder="Please Enter Your Email Address"
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{fontSize: 18, color: color.Primary, fontWeight: '500'}}>
              Password
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholderTextColor={'gray'}
                secureTextEntry={passwordVisibility}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  color: 'black',
                  marginTop: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                placeholder="Please Enter Your Password"
                autoCapitalize="none"
                onChangeText={t => setCredential({...credential, password: t})}
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={handlePasswordVisibility}
                style={{marginLeft: -40, marginTop: 22}}>
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
            }}></View>

          <Pressable
            style={styles.oauthbtn}
            onPress={() => {
              handleSignup();
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={styles.btnText}>
                {' '}
                {loading ? (
                  <ActivityIndicator animating={true} color={'white'} />
                ) : (
                  'Sign Up'
                )}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={{alignSelf: 'center', fontWeight: '400'}}>
          Already Have an Account ? {` `}
          <Text
            onPress={() => {
              navigation.goBack();
            }}
            style={{color: color.Primary, fontWeight: 'bold'}}>
            SignIn
          </Text>
        </Text>
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
  title: {fontSize: 30, color: 'white', fontWeight: '700'},
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
  forgotpasstext: {
    color: 'red',
  },
});
