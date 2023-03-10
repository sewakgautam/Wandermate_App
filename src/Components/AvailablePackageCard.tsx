import {Image, ImageBackground, Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, fonts, Route} from '../config/constraint';
import {useNavigation} from '@react-navigation/native';

export function AvailablePackages({
  imageLink,
  packageTitle,
  totalDays,
  packageId,
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        console.log(packageId);
        navigation.navigate(Route.Package, {packageId,packageTitle});
      }}>
      <ImageBackground
        imageStyle={{opacity: 0.5, borderRadius: 15}}
        key={packageId}
        source={{
          uri: `${imageLink}`,
        }}
        style={{
          borderRadius: 15,
          // elevation: 5,
          // shadowColor: color.Tabs,
          // margin: 10,
          marginVertical: 10,
          height: 100,
          width: 350,
        }}>
        <View
          style={{
            position: 'absolute',
            alignItems: 'flex-start',
            bottom: 10,
            gap: -15,
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              paddingBottom: 10,
              fontFamily: fonts.bold,
              fontSize: 20,
              textAlign: 'center',
            }}>
            {packageTitle}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13, fontFamily: fonts.medium}}>
                Days for Trip: {totalDays}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
