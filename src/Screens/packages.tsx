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

export function PackageDetail({navigation, route}) {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const packageId = route.params.packageId;
  navigation.setOptions({title: route.params.packageTitle});
  const [PackageDetails, setPackageDetails] = useState<{}>({});
  useEffect(() => {
    fetchBackend('get', `/packages/${packageId}`)
      .then((res: any) => {
        console.log('this is resp data', res);
        setPackageDetails(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
    setMyplan({...myPlan, packageId});
  }, [packageId]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectStart, setSelectStart] = useState(false);
  const [sessionData, setSessionData] = useState<{}>();
  const [selectEnd, setSelectEnd] = useState(false);
  const [myPlan, setMyplan] = useState<{
    packageId?: string;
    planTitle?: string;
    startDate?: Date;
    endDate?: Date;
    note?: string;
  }>({note: 'hello'});

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

  const copymyplan = async () => {
    await axios
      .post(`${BACKEND_API}/plans`, myPlan, {
        headers: {
          Authorization: `Bearer ${sessionData.jwt}`,
        },
      })
      .then(res => {
        console.log('this is response', res);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });

    // const {data} = useQuery('allHeritages', () =>
    //   CopyThePlan(myPlan, sessionData?.jwt),
    // );
    // console.log(data);
    // if (data) {
    //   navigation.navigate(Route.Plans);
    // }
  };

  return (
    <>
      <ScrollView style={{backgroundColor: color.Background, flex: 1}}>
        <View>
          <Image
            source={{
              uri: `${BACKEND_API}/${PackageDetails?.featureImage}`,
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
              {PackageDetails?.title}
            </Text>
          </View>
          <DataTable style={{borderColor: 'white', marginVertical: 20}}>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}>
                Total Time taken
              </DataTable.Title>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}
                numeric>
                Total Cost For Trip
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell textStyle={{color: 'white'}}>
                {PackageDetails.totalDays}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{color: 'white'}} numeric>
                Rs. {PackageDetails.totalCost}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <Text style={{color: 'white', marginTop: 10, textAlign: 'justify'}}>
            {PackageDetails.address}
            {PackageDetails.description}
          </Text>
        </View>

        <Button
          style={{
            backgroundColor: color.Primary,
            height: 50,
            borderRadius: 2,
            justifyContent: 'center',
            margin: 20,
          }}
          icon="clipboard-outline"
          mode="contained"
          onPress={() => setVisible(true)}>
          Make My Plan
        </Button>
      </ScrollView>
      <Dialog
        style={{backgroundColor: color.Primary}}
        visible={visible}
        onDismiss={hideDialog}>
        <Dialog.Content>
          <>
            <TextInput
              label="Title for Trip"
              mode="outlined"
              style={{backgroundColor: color.Primary}}
              outlineColor="white"
              right={<TextInput.Affix text="/100" />}
              underlineColor="transparent"
              placeholder="Make Your Own Title"
              textColor="white"
              theme={{
                roundness: 10,
                colors: {
                  onSurfaceVariant: 'white',
                },
              }}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={'white'}
              activeOutlineColor="white"
              onChangeText={t => {
                setMyplan({...myPlan, planTitle: t});
              }}
            />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button
                style={{
                  backgroundColor: color.Primary,
                  height: 40,
                  marginHorizontal: -10,
                  marginVertical: 20,
                }}
                icon="calendar-range"
                mode="contained"
                onPress={() => setSelectStart(true)}>
                {startDate ? startDate.toDateString() : 'Start Date'}
              </Button>
              {console.log('this is date', startDate.toISOString())}
              <Button
                style={{
                  backgroundColor: color.Primary,
                  height: 40,
                  marginVertical: 20,
                }}
                icon="calendar-range"
                mode="contained"
                onPress={() => setSelectEnd(true)}>
                {endDate ? endDate.toDateString() : 'End Date'}
              </Button>
            </View>

            <DatePicker
              modal
              mode="date"
              title={'Start Date'}
              open={selectStart}
              date={startDate}
              onConfirm={date => {
                console.log(date);
                setStartDate(date);
                setSelectStart(false);
                setMyplan({...myPlan, startDate: date.toISOString()});
              }}
              onCancel={() => {
                setSelectStart(false);
              }}
            />
            <DatePicker
              modal
              title={'End Date'}
              mode="date"
              open={selectEnd}
              date={endDate}
              onConfirm={date => {
                console.log(date);
                setEndDate(date);
                setSelectEnd(false);
                setMyplan({...myPlan, endDate: date.toISOString()});
              }}
              onCancel={() => {
                setSelectEnd(false);
              }}
            />
          </>
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor="white" onPress={hideDialog}>
            Cancel
          </Button>
          <Button textColor="white" onPress={() => copymyplan()}>
            Copy
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
