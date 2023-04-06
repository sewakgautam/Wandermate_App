import {useEffect, useState} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

import {Button, DataTable, Dialog, Text, TextInput} from 'react-native-paper';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';
import DatePicker from 'react-native-date-picker';
import {axiosInstance, CopyThePlan} from '../Utils/bridge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from 'react-query';
import axios from 'axios';

export function FestivalDetails({navigation, route}) {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const festivalId = route.params.festivalId;
  navigation.setOptions({title: route.params.festivalName});
  const [festivalDetails, setfestivalDetails] = useState<{}>({});
  useEffect(() => {
    fetchBackend('get', `/festivals/${festivalId}`)
      .then((res: any) => {
        console.log('this is resp data', res);
        setfestivalDetails(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [festivalId]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectStart, setSelectStart] = useState(false);
  const [sessionData, setSessionData] = useState<{}>();
  const [selectEnd, setSelectEnd] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(res => {
        const Datas = JSON.parse(res);
        setSessionData(Datas);
      })
      .catch(err => {
        console.log(err);
        console.log('User Not loggedin');

        navigation.navgate(Route?.Login);
      });
  }, [navigation]);

  return (
    <>
      <ScrollView style={{backgroundColor: color.Background, flex: 1}}>
        <View>
          <Image
            source={{
              uri: `${BACKEND_API}/${festivalDetails?.featureImage}`,
            }}
            style={{
              height: 280,
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: '#D0CCCC',
                fontSize: 30,
                fontFamily: fonts.bold,
                width: 250,
              }}>
              {festivalDetails?.festivalName}
            </Text>
          </View>
          <DataTable style={{borderColor: 'white', marginVertical: 20}}>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}>
                StartFrom
              </DataTable.Title>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}
                numeric>
                End On
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell textStyle={{color: 'white'}}>
                {festivalDetails.startFrom}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{color: 'white'}} numeric>
                {festivalDetails.endOn}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <Text style={{color: 'white', marginTop: 10, textAlign: 'justify'}}>
            {festivalDetails.description}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
