import React from 'react';
import {ImageBackground, StyleSheet, Image, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {color, fonts, Route} from '../config/constraint';

export default function Onboard({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: color.Background}}>
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/8888137/pexels-photo-8888137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={{
            height: 500,
            width: 370,
            marginBottom: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            letterSpacing: 10,
            textAlign: 'center',
            fontFamily: fonts.bold,
            color: color.Primary,
          }}>
          Hey, Mate
        </Text>
        <Text style={styles.titletext}>
          Let's Enjoy Your Dream Vacation On Nepal !
        </Text>

        <View style={{marginTop: 30}}>
          <TouchableRipple
            style={{
              backgroundColor: color.Primary,
              borderRadius: 10,
              width: 300,
              paddingVertical: 15,
            }}
            onPress={() => {
              navigation.navigate(Route.oauthscrean);
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Text style={styles.buttontext}>Let's go</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    marginLeft: 110,
    // marginTop: -220,
    resizeMode: 'contain',
  },
  titletext: {
    // fontWeight: '300',
    fontSize: 35,
    marginTop: 15,
    paddingHorizontal: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.light,
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
    color: 'white',
    fontWeight: '700',
    alignSelf: 'center',
  },
});
