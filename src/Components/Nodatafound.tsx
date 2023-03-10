import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {fonts} from '../config/constraint';

export default function NodataFound({
  message,
  ImageUri,
}: {
  message: string;
  ImageUri: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 80,
        marginVertical: 30,
      }}>
      <Image
        source={{
          uri: ImageUri,
          // uri: 'https://www.pngkey.com/png/full/370-3701115_find-near-me-airport-cartoon-png.png',
        }}
        style={{
          height: 130,
          width: 200,
          resizeMode: 'contain',
        }}
      />
      <Text style={{fontFamily: fonts.light, fontSize: 15, marginVertical: 10}}>
        {message}
      </Text>
    </View>
  );
}
