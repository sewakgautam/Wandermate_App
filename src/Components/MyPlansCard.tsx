import {Image, ImageBackground, Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, fonts, Route} from '../config/constraint';
import {useNavigation} from '@react-navigation/native';

export function MyPlans({imageLink, planTitle, address, planId}) {
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        imageStyle={{borderRadius: 20, opacity: 0.7}}
        key={planId}
        source={{
          uri: `${imageLink}`,
        }}
        style={{
          padding: 10,
          backgroundColor: color.Accent,
          elevation: 5,
          shadowColor: color.Tabs,
          marginVertical: 10,
          marginRight: 15,
          height: 250,
          width: 280,
          borderRadius: 20,
          marginTop: 10,
        }}>
        <View style={{position: 'absolute', bottom: 20, gap: -15}}>
          <Text
            style={{
              color: 'white',
              marginHorizontal: 10,
              paddingBottom: 10,
              fontFamily: fonts.bold,
              fontSize: 20,
              textAlign: 'center',
            }}>
            {planTitle}
          </Text>
          <View
            style={{
              color: 'white',

              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13, fontFamily: fonts.medium}}>
                {address}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
