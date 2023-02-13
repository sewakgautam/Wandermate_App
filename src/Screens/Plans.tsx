import {Image, Text, View} from 'react-native';
import {color} from '../config/constraint';

export default function Plans() {
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <View
        style={{
          marginHorizontal: 30,
          marginTop: 250,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png',
          }}
          style={{height: 200, width: 250}}
        />
        <Text
          style={{
            // color: 'black',
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center',
          }}>
          Plans were available only to Pro users.
        </Text>
        <Text
          style={{
            top: 10,
            // color: 'black',
            fontWeight: '400',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Our team is currently working on testing the Plan feature, so you'll
          be able to use it in the next update
        </Text>
      </View>
    </View>
  );
}
