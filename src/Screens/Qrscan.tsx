import {Image, Text, View} from 'react-native';
import {color} from '../config/constraint';

export default function Qrscan() {
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <View
        style={{marginHorizontal: 30, marginTop: 250, alignItems: 'center'}}>
        <Image
          source={require('../../assets/img/DesignAsset/sadcamera.png')}
          style={{height: 200, width: 250}}
        />
        <Text
          style={{
            // color: 'black',
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center',
          }}>
          Ooops!! we Cannot Access your camera.
        </Text>
        <Text
          style={{
            top: 10,
            // color: 'black',
            fontWeight: '400',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Keep it quiet! The developer of our application didn't know how to
          access the camera 😉
        </Text>
      </View>
    </View>
  );
}
