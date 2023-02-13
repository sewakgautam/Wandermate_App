import * as React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '../config/constraint';

const currentDate = new Date();
const dayHour = currentDate.getHours();
var status: string;
if (dayHour <= 11) {
  status = 'Morning';
} else if (dayHour <= 16) {
  status = 'Afternoon';
} else if (dayHour <= 19) {
  status = 'Evening';
} else {
  status = 'Night';
}

export function Weather({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: color.Background}}>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 100,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name={'map-marker'}
              color={'white'}
              size={20}
            />
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Belbari Nepal
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/5903/5903939.png',
            }}
            style={{height: 70, width: 70}}
          />
          <Text>30oC</Text>
          <View>
            <Text>Its Cloudy {status}</Text>
            <Text>Thursday, 04 February, 2023</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            height: 300,
          }}>
          <Text>Weather Information</Text>
          <View>
            <View>
              <Image
                source={{
                  uri: 'https://static-00.iconduck.com/assets.00/temperature-feels-like-icon-495x512-ylzv705f.png',
                }}
                style={{height: 31, width: 30}}
              />

              <View>
                <Text>Its Cloudy {status}</Text>
                <Text>30oC</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
