import React from 'react';
import {Image, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
export function Personalinfo() {
  return (
    <>
      <View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/img/DesignAsset/sushila.jpeg')}
            style={{
              borderRadius: 50,
              height: 100,
              width: 100,
            }}
          />
          <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
            Sushila Kafle
          </Text>
          <Text style={{fontSize: 15, fontWeight: '300', color: 'black'}}>
            kafle.sushilla56@gmail.com
          </Text>
        </View>
        <View>
          <TextInput mode="flat" placeholder="Full Name" />
          <TextInput mode="flat" placeholder="Email Address" />
          <TextInput
            mode="flat"
            placeholder="Contact Info"
            left={<TextInput.Affix text="+977" />}
          />
        </View>
      </View>
    </>
  );
}
