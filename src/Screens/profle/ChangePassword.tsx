import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as React from 'react';
import {Alert, Pressable, Text} from 'react-native';
import {Image, View} from 'react-native';
import {BACKEND_API, color, fonts} from '../../config/constraint';
import {axiosInstance} from '../../Utils/bridge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export function ChangePassword({navigation}) {
  navigation.setOptions({title: 'Security'});

  const [sessionData, setSessionData] = React.useState<{}>();

  // ------------ fetching from local storage --------
  React.useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(res => {
        const Datas = JSON.parse(res);
        setSessionData(Datas);
      })
      .catch(err => {
        navigation.navgate(Route.Login);
      });
  }, []);

  const signIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '367910959379-bgtc0fo0tko1hmctn3umhpnki15kdmcm.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo);
      console.log(userInfo);
      console.log(sessionData);

      if (userInfo) {
        // navigation.navigate(Route.ButtonNavigator);
        const linkAccount = await axios
          .post(
            `${BACKEND_API}/auth/link/oAuth`,
            {email: userInfo?.user?.email},
            {
              headers: {Authorization: `Bearer ${sessionData?.jwt}`},
            },
          )
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(res => {
            console.log(res);
            return res;
          });

        console.log(linkAccount.config);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'We Cannot Give Grand you access this time ',
        'try logging it with your own account',
      );
    }
  };

  return (
    <>
      <View style={{margin: 20}}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
            }}
            style={{height: 20, width: 20, marginHorizontal: 10}}
          />
          <View>
            <Text
              style={{color: 'black', fontFamily: fonts.bold, fontSize: 17}}>
              Google
            </Text>
            <Text
              style={{color: 'black', fontFamily: fonts.light, fontSize: 13}}>
              You can link Your Google Account Here
            </Text>
          </View>
          <Pressable onPress={() => signIn()} disabled={sessionData?.oAuth}>
            <Text
              style={{
                fontSize: 17,
                lineHeight: 21,
                fontWeight: '700',
                letterSpacing: 0.25,
                color: 'white',
                backgroundColor: sessionData?.oAuth ? 'gray' : color.Primary,
                margin: 10,
                marginLeft: 10,
                padding: 10,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}>
              {sessionData?.oAuth ? 'Linked' : 'Link'}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
