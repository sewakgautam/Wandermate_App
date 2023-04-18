import {Alert, StyleSheet, View} from 'react-native';
import CryptoJS from 'crypto-js';
import {color, Route} from '../config/constraint';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function Qrscan({navigation}: {navigation: any}) {
  const myAppIdentifier = 'heritageCode:'; // add a unique identifier for your app
  const secretKey = 'mysecretkey'; // replace with your secret key

  const scannedData = (t: any) => {
    const fields = t.split('!_:_!');
    console.log(fields);
    if (fields.length >= 2) {
      if (fields[1].startsWith(myAppIdentifier)) {
        const encryptedDefData = fields[1].slice(myAppIdentifier.length);
        const bytes = CryptoJS.AES.decrypt(encryptedDefData, secretKey);
        const decryptedDefData = bytes.toString(CryptoJS.enc.Utf8);
        // setDefData(decryptedDefData);
        console.log(decryptedDefData);
        navigation.navigate(Route.Heritage, {heritageId: decryptedDefData});
      } else {
        Alert.alert('Qrcode Invalid');
      }
    }
  };
  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      <QRCodeScanner
        markerStyle={{borderColor: color.Primary}}
        fadeIn={true}
        onRead={t => scannedData(t.data)}
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
