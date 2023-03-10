import {Image, Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {color, Route} from '../config/constraint';

export function HeritageCard(
  {imageLink, planceName: placeName, address, farFromUser},
  {navigation},
) {
  return (
    <>
      <Pressable
        style={{
          backgroundColor: color.Background,
          elevation: 5,
          shadowColor: color.Tabs,
          marginRight: 10,
          height: 230,
          width: 180,
          borderRadius: 20,
          marginTop: 10,
        }}>
        <Image
          source={{
            uri: `${imageLink}`,
          }}
          style={{
            resizeMode: 'cover',
            margin: 10,
            height: 130,
            width: 160,
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: 'bold',
            paddingBottom: 10,
            fontSize: 20,
          }}>
          {placeName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Entypo name={'location-pin'} size={20} color={color.Primary} />
            <Text style={{fontSize: 15, fontWeight: '700'}}>{address}</Text>
          </View>
          <View
            style={{
              backgroundColor: color.Primary,
              borderRadius: 50,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: 'white'}}>{farFromUser}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
