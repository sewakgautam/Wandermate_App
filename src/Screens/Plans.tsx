import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useQuery} from 'react-query';
import {AvailablePackages} from '../Components/AvailablePackageCard';
import {MyPlans} from '../Components/MyPlansCard';
import NodataFound from '../Components/Nodatafound';
import {BACKEND_API, color, fonts} from '../config/constraint';
import {fetchPackage, fetchUserPlans} from '../Utils/bridge';

export default function Plans({navigation}: {navigation: any}) {
  const [sessionData, setSessionData] = useState<{}>();

  // ------------ fetching from local storage --------
  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(res => {
        const Datas = JSON.parse(res);
        setSessionData(Datas);
      })
      .catch(err => {
        // console.log(err);
        // console.log('User Not loggedin');
        navigation.navgate(Route.Login);
      });
  }, []);

  // ---------- End of fetching local storage -----------

  // ------------------ fetching userPlans ----------

  var {data: myPlans, isLoading: isLoadingPlan} = useQuery(
    'myPlans',
    () => fetchUserPlans(sessionData?.jwt),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
    },
  );
  myPlans = myPlans?.data;

  // console.log(myPlans);

  // -------------------- end of fetching user plans ----------

  // ---------------------- fetching available Packages ----------

  var {data: packages, isLoading: isLoagingPackage} = useQuery(
    'packages',
    () => fetchPackage(),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 10000,
    },
  );
  packages = packages?.data;

  const planList = myPlans?.map((plan: any) => (
    <MyPlans
      imageLink={
        plan?.featureImage
          ? `${BACKEND_API}/${plan.featureImage}`
          : 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
      }
      planTitle={plan.planTitle}
      address={plan.address}
      planId={plan.planId}
    />
  ));

  // -------------------- end of fetching packages -------------

  const packageList = packages?.map((eachPackage: any) => {
    return eachPackage.status ? (
      <AvailablePackages
        imageLink={
          eachPackage.featureImage
            ? `${BACKEND_API}/${eachPackage.featureImage}`
            : 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
        }
        packageId={eachPackage.packageId}
        packageTitle={eachPackage.title}
        totalDays={eachPackage.totalDays}
        packageId={eachPackage.packageId}
      />
    ) : undefined;
  });
  // console.log(myPlans);

  return (
    <View style={{backgroundColor: color.Background, flex: 1}}>
      {isLoadingPlan && isLoagingPackage ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <ScrollView style={{margin: 20}} showsVerticalScrollIndicator={false}>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontFamily: fonts.bold,
              }}>
              My Plans
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{gap: 10}}>
              {!myPlans?.length ? (
                <NodataFound
                  message="No Plans Found..."
                  ImageUri="https://img.freepik.com/premium-vector/road-trip-vacation-by-car-mountain-highway-with-rocky-cliffs-view-concept-cartoon-illustration_338371-681.jpg?w=2000"
                />
              ) : (
                planList
              )}
            </ScrollView>
          </View>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontFamily: fonts.bold,
              }}>
              Available Packages
            </Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{gap: 10}}>
              {!packages?.length ? (
                <NodataFound
                  message="No Packages Found..."
                  ImageUri="https://www.pngkey.com/png/full/370-3701115_find-near-me-airport-cartoon-png.png"
                />
              ) : (
                packageList
              )}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
