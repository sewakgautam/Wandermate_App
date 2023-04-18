import {useEffect, useState} from 'react';
import {Image, ImageBackground, Linking, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, DataTable, Text} from 'react-native-paper';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';

export function HeritagePage({navigation, route}) {
  const heritageId = route.params.heritageId;
  navigation.setOptions({title: route.params.placeName});
  const [heritageDetails, setHeritageDetails] = useState<{}>({});
  useEffect(() => {
    fetchBackend('get', `/heritage/${heritageId}`)
      .then((res: any) => {
        console.log('this is resp data', res);
        setHeritageDetails(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [heritageId]);

  return (
    <>
      <ScrollView style={{backgroundColor: color.Background, flex: 1}}>
        <View>
          <Image
            source={{
              uri: `${BACKEND_API}/${heritageDetails?.featureImage}`,
            }}
            style={{
              height: 280,
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: '#D0CCCC',
                fontSize: 30,
                fontFamily: fonts.bold,
                width: 250,
              }}>
              {heritageDetails?.title}
            </Text>
            <Button
              style={{backgroundColor: color.Primary, height: 40}}
              icon="map"
              mode="contained"
              onPress={() =>
                navigation.navigate(Route.Navigation, {
                  destination: heritageDetails?.latandlong,
                  Category: heritageDetails.Category,
                  placeName: heritageDetails.title,
                })
              }>
              Navigate
            </Button>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name={'location-pin'} size={25} color={'#D0CCCC'} />
            <Text
              style={{color: 'white', fontSize: 20, fontFamily: fonts.light}}>
              {heritageDetails.address}
            </Text>
          </View>

          <Text style={{color: 'white', marginTop: 10, textAlign: 'justify'}}>
            {heritageDetails.description}
          </Text>
        </View>
        {heritageDetails.committee ? (
          <DataTable style={{borderColor: 'white', marginVertical: 20}}>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}>
                Committee Name
              </DataTable.Title>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}
                numeric>
                Contact Number
              </DataTable.Title>
              <DataTable.Title
                textStyle={{color: 'white', fontFamily: fonts.bold}}
                numeric>
                President Contact
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell textStyle={{color: 'white'}}>
                {heritageDetails?.committee?.name}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{color: 'white'}}
                numeric
                onPress={() => {
                  Linking.openURL(
                    `tel:${heritageDetails?.committee?.contactNumber}`,
                  );
                }}>
                {heritageDetails?.committee?.contactNumber}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{color: 'white'}}
                numeric
                onPress={() => {
                  Linking.openURL(
                    `tel:${heritageDetails?.committee?.committeePresidentContact}`,
                  );
                }}>
                {heritageDetails?.committee?.committeePresidentContact}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ) : undefined}
      </ScrollView>
    </>
  );
}
