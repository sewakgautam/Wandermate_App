import React, {PureComponent} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {Route} from '../config/constraint';

export default function Onboard({navigation}) {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=702&q=80',
      }}
      style={{flex: 1}}>
      <Image
        source={require('../../assets/img/logo/Main_logo_white.png')}
        style={styles.logo}
      />
      <View style={{marginTop: -120}}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 25,
            color: 'white',
            letterSpacing: 10,
            textAlign: 'center',
          }}>
          Hey, Mate
        </Text>
        <Text style={styles.titletext}>Let's Enjoy Your Dream Vacation</Text>
        <View style={{marginTop: 30}}>
          <Pressable
            style={{
              backgroundColor: 'white',
              marginHorizontal: 120,
              borderRadius: 15,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate(Route.oauthscrean);
              }}>
              <Text style={styles.buttontext}>Let's go</Text>
            </TouchableOpacity>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    marginLeft: 110,
    marginTop: -220,
    resizeMode: 'contain',
  },
  titletext: {
    fontWeight: '300',
    fontSize: 40,
    marginTop: 12,
    paddingHorizontal: 30,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    width: 300,
    elevation: 8,
    borderRadius: 20,
    marginVertical: 20,
    marginLeft: 50,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  buttontext: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    alignSelf: 'center',
  },
});
