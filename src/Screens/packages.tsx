import {useEffect, useState} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, DataTable, Text} from 'react-native-paper';
import {BACKEND_API, color, fonts} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';

export function PackageDetail({navigation, route}) {
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
  }, [packageId]);

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
          <DataTable  style={{borderColor: 'white', marginVertical: 20}}>
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
          style={{backgroundColor: color.Primary, height: 40, margin: 20}}
          icon="clipboard-outline"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Make My Plan
        </Button>
      </ScrollView>
    </>
  );
}
