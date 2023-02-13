import {Image, Text, View} from 'react-native';
import {color} from '../config/constraint';

export default function Maps() {
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <View
        style={{marginHorizontal: 30, marginTop: 250, alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/no-address-found-4064364-3363925.png',
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
          Maps were available only for testing users.
        </Text>
        <Text
          style={{
            top: 10,
            // color: 'black',
            fontWeight: '400',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Our team is currently working on testing the Map and Navigation
          feature, so you'll be able to use it in the next update.
        </Text>
      </View>
    </View>
  );
}
