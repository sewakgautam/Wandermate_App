import * as React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {color, fonts, Route} from '../config/constraint';
import {useNavigation} from '@react-navigation/native';

export function CategoryCard({
  categoryImage,
  categoryName,
  categoryId,
}: {
  categoryImage: string;
  categoryName: string;
  categoryId: string;
}) {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate(Route.Category, {categoryId})}
        key={categoryId}
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
        {/* {console.log(categoryImage)} */}
        <Image
          style={{height: 20, width: 20}}
          source={{uri: `${categoryImage}`}}
        />
        <Text style={{fontFamily: fonts.medium, fontSize: 15}}>
          {categoryName}
        </Text>
      </Pressable>
    </>
  );
}
