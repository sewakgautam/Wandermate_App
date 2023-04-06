import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import {color, fonts, Route} from '../config/constraint';
import {fetchNotes} from '../Utils/bridge';

export default function MyNotes({navigation}) {
  const [sessionData, setSessionData] = useState<{}>();
  // ------------ fetching from local storage --------
  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(res => {
        const Datas = JSON.parse(res);
        setSessionData(Datas);
      })
      .catch(err => {
        console.log(err);
        console.log('User Not loggedin');
        navigation.navgate(Route.Login);
      });
  }, []);

  var {
    data: notes,
    isLoading,
    isSuccess,
  } = useQuery('allNotes', () => fetchNotes(sessionData?.jwt), {
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 1000,
  });
  notes = notes?.data;

  const myNotes = notes?.map(each => (
    <Pressable
      onPress={() => {
        navigation.navigate(Route.EachNote, {noteId: each.noteId});
      }}
      style={{
        backgroundColor: color.Tabs,
        height: 200,
        width: 170,
        borderRadius: 10,
        padding: 15,
      }}>
      <Text style={{fontFamily: fonts.bold, color: 'white'}}>{each.title}</Text>
      <Text style={{color: 'white', fontFamily: fonts.light}}>
        {each.notes.substr(0, 150) + ' .......'}
      </Text>
    </Pressable>
  ));

  return (
    <ScrollView style={{backgroundColor: color.Background, flex: 1}}>
      {!notes ? (
        <View style={{justifyContent: 'center', marginTop: 50}}>
          <ActivityIndicator size="large" color={color.Primary} />
        </View>
      ) : (
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 20,
            gap: 10,
            flexDirection: 'row',
          }}>
          {myNotes}
        </View>
      )}
    </ScrollView>
  );
}
