import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  axiosInstance,
  featchEachNote,
  fetchNotes,
  fetchUserInfo,
} from '../Utils/bridge';
import axios from 'axios';

export default function EachNote({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  navigation.setOptions({
    headerRight: () => (
      <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
        <Pressable>
          <AntDesign
            name={'delete'}
            onPress={handleDeleteNote}
            size={20}
            color={'red'}
          />
        </Pressable>
      </View>
    ),
  });

  const handleDeleteNote = () => {
    axios
      .delete(`${BACKEND_API}/notes/${noteData?.noteId}`, {
        headers: {
          Authorization: `Bearer ${sessionData?.jwt}`,
        },
      })
      .then((res: any) => {
        // console.log('this is res', res);
        navigation.goBack();
      })
      .catch((err: any) => {
        console.log('this is error', err);
      });
  };
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
  }, [navigation]);
  const noteId = route.params.noteId;

  var {
    data: noteData,
    isLoading,
    isSuccess,
  } = useQuery(
    'eachNoteDetails',
    () => featchEachNote(sessionData?.jwt, noteId),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
    },
  );

  noteData = noteData?.data;
  console.log(noteData);

  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      {!noteData?.createdAt ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={color.Primary} />
        </View>
      ) : (
        <View style={{margin: 20}}>
          <Text style={{fontFamily: fonts.bold, color: 'white', fontSize: 30}}>
            {noteData?.title}
          </Text>
          <View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={{fontFamily: fonts.medium, color: 'white'}}>
                Created At :
              </Text>
              <Text style={{fontFamily: fonts.light, color: 'white'}}>
                {noteData?.createdAt}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={{fontFamily: fonts.medium, color: 'white'}}>
                Updated At :
              </Text>
              <Text style={{fontFamily: fonts.light, color: 'white'}}>
                {noteData?.updatedAt}
              </Text>
            </View>
          </View>
          <ScrollView style={{marginTop: 10}}>
            <Text
              style={{fontFamily: fonts.light, color: 'white', marginTop: 20}}>
              {noteData?.notes}
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
