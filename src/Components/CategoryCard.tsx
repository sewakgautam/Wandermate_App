import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {color, fonts} from '../config/constraint';

export function CategoryCard({categoryImage, categoryName}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          height: 40,
          width: 130,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          borderColor: color.Primary,
          borderWidth: 1,
          marginRight: 10,
        }}>
        <Image
          style={{height: 20, width: 20}}
          source={{uri: `${categoryImage}`}}
        />
        <Text style={{fontFamily: fonts.medium, fontSize: 15}}>
          {categoryName}
        </Text>
      </View>
    </>
  );
}
