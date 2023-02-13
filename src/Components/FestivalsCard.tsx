import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {color, fonts} from '../config/constraint';

export function FestivalCard({
  festivalImage,
  festivalTitle,
  festivalDescription,
}) {
  return (
    <>
      <View style={{marginBottom: 10}}>
        <View
          style={{
            width: 360,
            height: 105,
            borderRadius: 5,
            borderColor: color.Primary,
            borderWidth: 1,
            padding: 10,
            flexDirection: 'row',
            backgroundColor: color.Background,
            gap: 10,
            paddingVertical: 10,
          }}>
          <Image
            style={{height: 80, width: 100, borderRadius: 10}}
            source={{uri: `${festivalImage}`}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontFamily: fonts.medium, fontSize: 20}}>
              {festivalTitle}
            </Text>
            <Text
              style={{
                fontFamily: fonts.light,
                fontSize: 11,
                width: 230,
                textAlign: 'justify',
              }}>
              {festivalDescription}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
