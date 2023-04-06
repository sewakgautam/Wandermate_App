import {Image, Pressable, View} from 'react-native';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';
import {Searchbar, Text} from 'react-native-paper';
import React, {useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {fetchBackend} from '../config/FetchData';

export default function Search({navigation}) {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    fetchBackend('get', `/heritage/search/${searchQuery}`).then(res => {
      setSearchData(res);
      // console.log(res);
    });
  }, [searchQuery]);

  // console.log(searchData?.data);

  const search = searchData?.map(each => (
    <Pressable
      onPress={() => {
        navigation.navigate(Route.Heritage, {
          heritageId: each?.heritageId,
          placeName: each?.title,
        });
      }}
      style={{
        backgroundColor: color.Background,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        gap: 10,
        marginHorizontal: 20,
        marginVertical: 5,
      }}>
      <Image
        source={{
          uri: `${BACKEND_API}/${each.featureImage}`,
        }}
        style={{
          height: 70,
          width: 100,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <View style={{padding: 10}}>
        <Text style={{fontFamily: fonts.bold, color: 'white'}}>
          {each.title}
        </Text>
        <Text
          style={{
            fontFamily: fonts.light,
            color: 'white',
            width: 250,
          }}>
          {each.description.substr(0, 30) + '  .....'}
        </Text>
      </View>
    </Pressable>
  ));

  return (
    <>
      <View style={{backgroundColor: 'black', flex: 1}}>
        <View style={{margin: 20}}>
          <Searchbar
            style={{
              justifyContent: 'center',
              marginHorizontal: 10,
              paddingRight: 10,
              borderRadius: 20,
              backgroundColor: '#1C1C1C',
            }}
            selectionColor={color.Primary}
            onLayout={() => {
              inputRef?.current.focus();
            }}
            ref={inputRef}
            autoFocus={true}
            iconColor="gray"
            loading={isLoading}
            inputStyle={{color: 'white'}}
            placeholder="Where You are Going ?"
            placeholderTextColor={'gray'}
            elevation={2}
            onFocus={() => setLoading(true)}
            onBlur={() => setLoading(false)}
            onChangeText={t => setSearchQuery(t)}
            value={searchQuery}
          />
        </View>
        {search}
      </View>
    </>
  );
}
