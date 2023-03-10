import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {AnimatedFAB, Drawer, FAB, Text} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Entypo from 'react-native-vector-icons/Entypo';
import {HeritageCard} from '../Components/HeirtageHomePageCard';
import {color, fonts, Route} from '../config/constraint';
import {fetchBackend} from '../config/FetchData';
import {BottomScroll} from '../Components/BottomSheet';
import {CategoryCard} from '../Components/CategoryCard';
import {useQuery} from 'react-query';
import {fetchCategories, fetchHeritages, fetchUserInfo} from '../Utils/bridge';
import AsyncStorage from '@react-native-async-storage/async-storage';

const currentDate = new Date();
const dayHour = currentDate.getHours();
var Greetings: string;
if (dayHour <= 11) {
  Greetings = 'Good Morning';
} else if (dayHour <= 16) {
  Greetings = 'Good Afternoon';
} else if (dayHour <= 19) {
  Greetings = 'Good Evening';
} else {
  Greetings = 'Good Night';
}

export default function HomePage({navigation}) {
  // settingup weather state to display current weather on the screen
  const [weather, setWeather] = useState<{temp: string; icon: string}>({
    temp: '10',
    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
  });
  // getting day hour which mean getting morning evening

  //  setting up the geo location state to store the location of the user
  const [geoLocation, setGetLocation] = useState({});
  const [searchQuery, setSearchQuery] = React.useState('');

  const wetherApikey = 'b5d32261c0dc4f88a71111045221406'; // api key of weatherApi
  useEffect(() => {
    Geolocation.getCurrentPosition(info => setGetLocation(info));
    // accessing the user current location and setting it on the state
  }, []);
  const [isExtended, setIsExtended] = React.useState(true);
  const [heritage, setHeritage] = useState<{
    featureImage: string;
    title: string;
    address: string;
  }>();

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://api.weatherapi.com/v1/current.json?key=${wetherApikey}&q=${geoLocation?.coords?.latitude},${geoLocation?.coords?.longitude}`,
    })
      .then(res => {
        const tempdata = res.data.current;
        setWeather({
          temp: tempdata.temp_c,
          icon: tempdata.condition.icon,
        });
        // using wetherapi Api getting the user location weather data
      })
      .catch(err => {
        console.log(err);
      });
  }, [geoLocation]);

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


  //  ----------- Fetch from Backend  --------
  var {data: heritageDatas, isLoading: loadingHeritage} = useQuery(
    'allHeritages',
    () => fetchHeritages(),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
    },
  );
  heritageDatas = heritageDatas?.data;

  var {data: categories, isLoading: loadingCategories} = useQuery(
    'allCategories',
    () => fetchCategories(),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 10000,
    },
  );
  categories = categories?.data;
  var {data: userData, isLoading} = useQuery(
    'userInfo',
    () => fetchUserInfo(sessionData?.jwt),
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 10000,
    },
  );
  userData = userData?.data;


  const heritageList = heritageDatas?.map((heritage: any) => (
    <HeritageCard
      imageLink={
        heritage.featureImage
          ? `${BACKEND_API}/${heritage?.featureImage}`
          : 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
      }
      placeName={heritage.title}
      address={heritage.address}
      farFromUser={heritage.totalTimeTaken}
      heritageId={heritage.heritageId}
    />
  ));

  const categoryList = categories?.map((category: any) => (
    <CategoryCard
      categoryName={category.title}
      categoryImage={
        category.icon
          ? `${BACKEND_API}/${category.icon}`
          : 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
      }
      categoryId={category.categoryId}
    />
  ));
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                alwaysBounceHorizontal
                horizontal
                style={{marginVertical: 20}}>
                {!categories?.length ? (
                  <Text>No Categories Found ........... </Text>
                ) : (
                  categoryList
                )}
              </ScrollView>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  fontFamily: fonts.regular,
                }}>
                Popular Destinations
              </Text>

              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{height: 240}}>
                {!heritageDatas?.length ? (
                  <NodataFound
                    message="No Heritage Found"
                    ImageUri="https://www.pngkey.com/png/full/370-3701115_find-near-me-airport-cartoon-png.png"
                  />
                ) : (
                  heritageList
                )}
              </ScrollView>
            </View>
    </View>
  );
}
