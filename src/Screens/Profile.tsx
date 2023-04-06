import {Image, ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {List} from 'react-native-paper';
import {BACKEND_API, color, Route} from '../config/constraint';
import {SettingList} from '../Components/SettingList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from 'react-query';
import {fetchUserInfo} from '../Utils/bridge';

export default function Profile({navigation}) {
  const [sessionData, setSessionData] = React.useState<{}>();

  // ------------ fetching from local storage --------
  React.useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(res => {
        const Datas = JSON.parse(res);
        setSessionData(Datas);
      })
      .catch(err => {
        console.log(err);
        console.log('User Not loggedin');
        navigation.navgate(Route.Login);
      });
  }, []);

  // ---------- End of fetching local storage -----------

  var {data: userData, isLoading} = useQuery(
    'userInfo',
    () => fetchUserInfo(sessionData?.jwt),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 10000,
    },
  );
  userData = userData?.data;

  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <View style={{marginHorizontal: 20, top: 30}}>
        <Text
          onPress={() => navigation.goBack(Route.profile)}
          style={{fontSize: 30, fontWeight: 'bold'}}>
          Profile
        </Text>
        <View
          style={{
            marginTop: 20,
            elevation: 20,
            shadowColor: 'rgba(0, 0, 0, 0.06)',
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            backgroundColor: color.Primary,
            borderRadius: 5,
            paddingLeft: 20,
          }}>
          <Image
            // source={require('../../assets/img/DesignAsset/sushila.jpeg')}
            source={{
              uri: userData
                ? `${BACKEND_API}/${userData?.avatar}`
                : 'https://images.goodsmile.info/cgm/images/product/20200513/9505/69654/large/a3b56bccc98a8d4282224f40806415ff.jpg',
            }}
            style={{
              resizeMode: 'contain',
              borderRadius: 50,
              height: 70,
              width: 70,
              borderColor: 'white',
              borderWidth: 2,
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '900'}}>
              {userData?.name}
            </Text>
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              {userData?.email}
            </Text>
          </View>
        </View>
        <ScrollView style={{height: 550}}>
          <View
            style={{
              backgroundColor: color.Tabs,
              height: 440,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View style={{marginVertical: 20, gap: 20}}>
              <SettingList
                iconName={'account-outline'}
                title={'Personal Info'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Personalinfo}
                paramData={userData}
              />
              <SettingList
                iconName={'currency-usd'}
                title={'Forex Exchange'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Currency}
              />
              <SettingList
                iconName={'lock-outline'}
                title={'Security'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.ChangePassword}
              />

              <SettingList
                iconName={'message-outline'}
                title={'My Notes'}
                subTitle={'Keep your Thoughts Secure  '}
                navigateTo={Route.Notes}
              />
              <SettingList
                iconName={'clipboard-text'}
                title={'Leave Feedback'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Heritage}
              />
              <SettingList
                iconName={'account-arrow-right-outline'}
                title={'Logout'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Login}
              />
            </View>
          </View>
          <Text
            style={{
              // color: 'black',
              marginVertical: 20,
              fontSize: 20,
              fontWeight: '700',
            }}>
            More
          </Text>
          <View
            style={{
              backgroundColor: color.Tabs,
              height: 300,
              borderRadius: 10,
            }}>
            <View style={{marginVertical: 20, gap: 20}}>
              <SettingList
                iconName={'heart-outline'}
                title={'HelpCenter'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Helpandsupport}
              />
              <SettingList
                iconName={'information-outline'}
                title={'About App'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Aboutpage}
              />
              <SettingList
                iconName={'note-outline'}
                title={'Terms & Condition'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Termsandcondition}
              />

              <SettingList
                iconName={'police-badge-outline'}
                title={'Privacy & Policy'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.PrivacyandPolicy}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
