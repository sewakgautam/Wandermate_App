import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {BACKEND_API, color} from '../../config/constraint';
export function Personalinfo({navigation, route}) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(route.params.userData);
    setUserData(route.params.userData);
  }, [route]);

  console.log(userData);
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1610997686651-98492fd08108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80',
          }}
          style={{
            height: 250,
            width: 380,
            margin: 5,
            borderRadius: 20,
          }}></Image>
        <View style={{alignItems: 'center', marginTop: -50}}>
          <Image
            source={{
              uri: userData
                ? `${BACKEND_API}/${userData?.avatar}`
                : 'https://images.goodsmile.info/cgm/images/product/20200513/9505/69654/large/a3b56bccc98a8d4282224f40806415ff.jpg',
            }}
            style={{
              borderRadius: 50,
              height: 100,
              width: 100,
              borderColor: 'white',
              borderWidth: 2,
            }}
          />
          <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
            Sushila Kafle
          </Text>
          <Text style={{fontSize: 15, fontWeight: '300', color: 'black'}}>
            kafle.sushilla56@gmail.com
          </Text>
        </View>
        {/* <View>
          <TextInput mode="flat" placeholder="Full Name" />
          <TextInput mode="flat" placeholder="Email Address" />
          <TextInput
            mode="flat"
            placeholder="Contact Info"
            left={<TextInput.Affix text="+977" />}
          />
        </View> */}
      </View>
    </>
  );
}
