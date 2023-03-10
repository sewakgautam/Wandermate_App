import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from '../config/constraint';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function Qrscan() {
  const scannedData = t => {
    console.log(t.data);
    Alert.alert(t.data);
  };
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <QRCodeScanner
        markerStyle={{borderColor: color.Primary}}
        fadeIn={true}
        onRead={t => scannedData(t)}
        showMarker={true}
        reactivate={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
