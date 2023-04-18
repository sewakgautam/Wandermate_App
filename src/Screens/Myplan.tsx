import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, DataTable} from 'react-native-paper';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from 'react-query';
import axios from 'axios';
import {HeritageCard} from '../Components/HeirtageHomePageCard';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {fetchEachPlan} from '../Utils/bridge';

export function MyplanDetails({navigation, route}) {
  const [visible, setVisible] = useState(false);
  const [sessionData, setSessionData] = useState<{}>();
  const [waypoints, setWayPoints] = useState();
  const [EditedDescription, setEditedDescription] = useState('');
  const [btnsheetIndex, setIndex] = useState(-1);
  const [isNote, SetisNote] = useState(false);
  const [noteData, setNoteData] = useState<{
    notes?: string;
    planId?: string;
    title?: string;
  }>({});

  const planId = route.params.planId;
  // navigation.setOptions({title: route.params.packageTitle});
  // navigation.setOptions({headerRight:{})
  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then((res: any) => {
        const Datas = JSON.parse(res);
        setSessionData(Datas);
      })
      .catch(err => {
        console.log(err);
        console.log('User Not loggedin');

        navigation.navgate(Route?.Login);
      });
  }, [navigation]);

  var {data: planData, isSuccess} = useQuery(
    'individualPlan',
    () => fetchEachPlan(planId, sessionData?.jwt),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
    },
  );
  planData = planData?.data;

  useEffect(() => {
    setEditedDescription(planData?.description);
    setNoteData({
      ...noteData,
      planId: planData?.planId,
      title: planData?.planTitle,
    });
  }, [planData]);

  // console.log(noteData);

  var heritageData;

  useEffect(() => {
    if (isSuccess) {
      const datasOk = planData?.heritage?.map((each: any) => {
        return each.latandlong;
      });
      setWayPoints(datasOk);
    }
  }, [isSuccess, planData]);
  if (isSuccess) {
    // console.log(planData?.itinerary);

    heritageData = planData?.heritage?.map((each: any) => {
      // console.log(each);
      return (
        <HeritageCard
          imageLink={
            each?.featureImage
              ? `${BACKEND_API}/${each?.featureImage}`
              : 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
          }
          placeName={each.title}
          address={each.address}
          farFromUser={each.totalTimeTaken}
          heritageId={each.heritageId}
        />
      );
    });
  }

  // var {data: heritageDatas, isLoading: loadingHeritage} = useQuery(
  //   'allHeritages',
  //   () => fetchHeritages(),
  //   {
  //     refetchOnWindowFocus: true,
  //     staleTime: 0,
  //     cacheTime: 0,
  //     refetchInterval: 1000,
  //   },
  // );
  // heritageDatas = heritageDatas?.data;

  navigation.setOptions({
    headerRight: () => (
      <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
        <Pressable>
          <Entypo
            name={'edit'}
            onPress={handleSheetChanges}
            size={20}
            color={color.Primary}
          />
        </Pressable>
        <Pressable>
          <AntDesign
            name={'delete'}
            onPress={handleDeletePlan}
            size={20}
            color={'red'}
          />
        </Pressable>
      </View>
    ),
  });
  console.log(waypoints);
  const handleDeletePlan = () => {
    axios
      .delete(`${BACKEND_API}/plans/${planData?.planId}`, {
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

  const Editplan = () => {
    axios
      .patch(
        `${BACKEND_API}/plans/${planData?.planId}`,
        {description: EditedDescription},
        {
          headers: {
            Authorization: `Bearer ${sessionData?.jwt}`,
          },
        },
      )
      .then(err => {
        navigation.goBack();
      });
  };
  const saveNote = () => {
    axios
      .post(`${BACKEND_API}/notes`, noteData, {
        headers: {
          Authorization: `Bearer ${sessionData?.jwt}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setIndex(-1);
        setNoteData({});
        SetisNote(false);
        // navigation.navigate(Route.Notes);
      });
  };

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback(() => {
    // console.log('handleSheetChanges', index);
    setIndex(1);
  }, []);

  const handleNote = useCallback(() => {
    // console.log('handleSheetChanges', index);
    setIndex(0);
    SetisNote(true);
  }, []);
  return (
    <>
      <ScrollView style={{backgroundColor: color.Background, flex: 1}}>
        <View>
          <Image
            source={{
              uri: `${BACKEND_API}/${planData?.featureImage}`,
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
              {planData?.planTitle}
            </Text>
          </View>
          <DataTable style={{borderColor: 'white', marginVertical: 20}}>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}>
                Start Date
              </DataTable.Title>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}
                numeric>
                End Date
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell textStyle={{color: 'white'}}>
                {planData?.startDate}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{color: 'white'}} numeric>
                {planData?.endDate}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          <Text style={{color: 'white', marginTop: 10, textAlign: 'justify'}}>
            {/* {planDetails.address} */}
            {planData?.description}
          </Text>
        </View>
        <View style={{margin: 20}}>
          <Text
            style={{
              color: '#D0CCCC',
              fontSize: 18,
              fontFamily: fonts.bold,
              width: 250,
            }}>
            Related heritage on this Plan
          </Text>
          <ScrollView
            horizontal
            style={{display: 'flex', flexDirection: 'row'}}>
            {heritageData}
          </ScrollView>
        </View>
        <View
          style={{display: 'flex', flexDirection: 'row', margin: 20, gap: 10}}>
          <Button
            style={{
              height: 50,
              marginVertical: 20,
              borderRadius: 2,
              justifyContent: 'center',
              flex: 0.3,
            }}
            icon="clipboard-outline"
            mode="outlined"
            textColor="white"
            onPress={handleNote}>
            Add Note
          </Button>
          <Button
            style={{
              backgroundColor: color.Primary,
              height: 50,
              marginVertical: 20,
              borderRadius: 2,
              justifyContent: 'center',
              flex: 0.8,
            }}
            icon="map-outline"
            mode="contained"
            onPress={() =>
              navigation.navigate(Route.Waypoints, {
                destination: waypoints,
                placeName: planData?.planTitle,
              })
            }>
            Show MY Way Points
          </Button>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={btnsheetIndex}
        snapPoints={snapPoints}
        enableHandlePanningGesture
        enableOverDrag
        enablePanDownToClose={true}
        handleIndicatorStyle={{backgroundColor: color.Primary}}
        // enableHandlePanningGesture
        detached={true}
        backgroundStyle={{borderRadius: 30}}
        backgroundStyle={{backgroundColor: color.Accent}}
        onChange={handleSheetChanges}>
        {isNote ? (
          <View style={styles.contentContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  color: 'white',
                }}>
                Add Note
              </Text>
              <Button
                style={{
                  height: 40,
                  marginVertical: 20,
                  borderColor: 'white',
                }}
                mode="outlined"
                textColor="white"
                onPress={saveNote}>
                Save
              </Button>
            </View>

            <TextInput
              value={noteData.notes}
              placeholder="Start Write your Notes for this plan.........."
              style={{
                backgroundColor: color.Background,
                borderColor: color.Primary,
                borderWidth: 1,
                height: 450,
                textAlignVertical: 'top',
                padding: 20,
                lineHeight: 20,
              }}
              multiline
              onChangeText={t => {
                setNoteData({...noteData, notes: t});
              }}
              numberOfLines={50}
            />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  // marginVertical: 20,
                  fontFamily: fonts.bold,
                  color: 'white',
                }}>
                Edit Description
              </Text>
              <Button
                style={{
                  height: 40,
                  marginVertical: 20,
                  borderColor: 'white',
                }}
                mode="outlined"
                textColor="white"
                onPress={Editplan}>
                Save
              </Button>
            </View>

            <TextInput
              value={EditedDescription}
              style={{
                backgroundColor: color.Background,
                borderColor: color.Primary,
                borderWidth: 1,
                height: 450,
                textAlignVertical: 'top',
                padding: 20,
                lineHeight: 20,
              }}
              multiline
              onChangeText={t => {
                setEditedDescription(t);
              }}
              numberOfLines={50}
            />
          </View>
        )}
      </BottomSheet>
      {/* </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
});
