import {Image, ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {List} from 'react-native-paper';
import {color, Route} from '../config/constraint';
import {SettingList} from '../Components/SettingList';
export default function Profile({navigation}) {
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
            source={require('../../assets/img/DesignAsset/sushila.jpeg')}
            // source={{
            //   uri: 'https://scontent.fbir2-1.fna.fbcdn.net/v/t39.30808-6/319294733_696361075389835_5454243774522418209_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IjgLTtAUBrwAX-Nb1VA&_nc_ht=scontent.fbir2-1.fna&oh=00_AfAFpT3-b0VA96gBLWEjIqWPUZwPs3lD38AiTu8hW9veHw&oe=63E47DB7',
            // }}
            style={{
              borderRadius: 50,
              height: 70,
              width: 70,
              borderColor: 'white',
              borderWidth: 2,
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '900'}}>
              Sushila Kafle
            </Text>
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              kafle.sushilla56@gmail.com
            </Text>
          </View>
        </View>
        <ScrollView style={{height: 550}}>
          <View
            style={{
              backgroundColor: color.Background,
              height: 400,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <View style={{marginVertical: 20, gap: 20}}>
              <SettingList
                iconName={'account-outline'}
                title={'Personal Info'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Personalinfo}
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
                title={'Chat with us'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Heritage}
              />
              <SettingList
                iconName={'clipboard-text'}
                title={'Leave Feedback'}
                subTitle={'make Changes to your account'}
                navigateTo={Route.Heritage}
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
              backgroundColor: color.Accent,
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
