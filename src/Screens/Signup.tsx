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
import Entypo from 'react-native-vector-icons/Entypo';
import {Route} from '../config/constraint';

export default function Signup({navigation}) {
  const windowHeight = useWindowDimensions().height;
  const [credential, setCredential] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

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
        uri: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      }}
      imageStyle={{opacity: 0.4}}
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
            <Text style={styles.title}>Create an Account </Text>
            <Text style={styles.subtitle}>
              Explore Nepal for lifetimes experiences.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, color: '#183E71', fontWeight: '500'}}>
              Email Address
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
                }}
                placeholder="Please Enter Your Password"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={handlePasswordVisibility}
                style={{marginLeft: -40, marginTop: 22}}>
                <Entypo name={rightIcon} size={20} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, color: '#183E71', fontWeight: '500'}}>
              Confirm Password
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
                }}
                placeholder="Please Confirm Your Password"
                autoCapitalize="none"
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
              navigation.navigate(Route.SignupInformation);
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
        <Text style={{alignSelf: 'center', fontWeight: '400'}}>
          Already Have an Account ?
          <Text
            onPress={() => {
              Alert.alert('Hello');
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
    borderColor: '#C6C6C6',
  },
  titletextparent: {
    marginHorizontal: 24,
    marginTop: -100,
  },
  title: {fontSize: 30, fontWeight: '700'},
  subtitle: {color: '#999EA1', fontSize: 17},
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
  forgotpasstext: {
    color: 'red',
  },
});
