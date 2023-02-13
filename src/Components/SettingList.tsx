import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export function SettingList({iconName, title, subTitle, navigateTo}) {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate(navigateTo)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{flexDirection: 'row', gap: 15}}>
          <View
            style={{
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'rgba(6, 1, 180, 0.05)',
            }}>
            <MaterialCommunityIcons name={`${iconName}`} size={20} />
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
            <Text style={{fontSize: 14, fontWeight: '300'}}> {subTitle}</Text>
          </View>
        </View>
        <Entypo name={'chevron-right'} size={20} color={'gray'} />
      </Pressable>
    </>
  );
}
