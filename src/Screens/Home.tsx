import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {HeritageCard} from '../Components/HeirtageHomePageCard';
import {BACKEND_API, color, fonts, Route} from '../config/constraint';
import {BottomScroll} from '../Components/BottomSheet';
import {CategoryCard} from '../Components/CategoryCard';
import {useQuery} from 'react-query';
import {fetchCategories, fetchHeritages, fetchUserInfo} from '../Utils/bridge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NodataFound from '../Components/Nodatafound';

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
  const [sessionData, setSessionData] = useState<{}>();

  const [geoLocation, setGetLocation] = useState({});
  const [searchQuery, setSearchQuery] = React.useState('');

  const weatherApikey = 'b5d32261c0dc4f88a71111045221406'; // api key of weatherApi
  useEffect(() => {
    Geolocation.getCurrentPosition(info => setGetLocation(info));
    // accessing the user current location and setting it on the state
  }, []);

  //  ----------- Fetching Weather from Weather API -------
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://api.weatherapi.com/v1/current.json?key=${weatherApikey}&q=${geoLocation?.coords?.latitude},${geoLocation?.coords?.longitude}`,
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

  //  ----------- End of Fetching Weather from Weather API -------

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

  // ---------- End of fetching local storage -----------

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
      refetchInterval: 1000,
    },
  );
  userData = userData?.data;

  // if (userData) {
  //   console.log(userData);
  // }
  // console.log(userData);

  //  ---------------- End Backend Fetch ----------

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
      {isLoading && loadingHeritage && loadingCategories ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View>
          <View>
            <View
              style={{
                top: 15,
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingTop: 10,
              }}>
              <View
                style={{
                  // backgroundColor: 'hsla(0, 1%, 100%, 0.57)',
                  borderRadius: 10,
                  flexDirection: 'row',
                  gap: 10,
                  padding: 10,
                }}>
                <Image
                  source={{
                    uri: userData?.avatar
                      ? `${BACKEND_API}/${userData?.avatar}`
                      : 'https://images.goodsmile.info/cgm/images/product/20200513/9505/69654/large/a3b56bccc98a8d4282224f40806415ff.jpg',
                  }}
                  style={{
                    resizeMode: 'contain',
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    borderColor: color.Primary,
                    borderWidth: 1,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontFamily: fonts.light,
                    }}>
                    {Greetings}!
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontFamily: fonts.bold,
                    }}>
                    {userData?.name ? `${userData.name}` : 'Guest User'}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => navigation.navigate(Route.Weather)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 0.5,
                  height: 60,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: color.Accent,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'white',
                      lineHeight: 30,
                      // fontWeight: 'bold',
                      fontFamily: fonts.bold,
                    }}>
                    {(+weather.temp | 0) - 2}
                  </Text>
                  {/* decreasing the weather value by 2 beacaues while testing we got temperature more than 2 from the real temperature */}
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      lineHeight: 20,
                      fontFamily: fonts.medium,
                    }}>
                    o
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      lineHeight: 25,
                      fontFamily: fonts.medium,
                    }}>
                    C
                  </Text>
                </View>
                <Image
                  source={{uri: `http:${weather.icon}`}}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                />
              </Pressable>
            </View>
            <View style={{marginHorizontal: 20, marginVertical: 20}}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 30,
                  color: 'white',
                  marginRight: 120,
                  fontFamily: fonts.bold,
                }}>
                Explore the Beauty of Nepal !
              </Text>
            </View>
            <View>
              <Searchbar
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 20,
                  borderRadius: 20,
                  backgroundColor: '#1C1C1C',
                }}
                selectionColor={color.Primary}
                iconColor="gray"
                inputStyle={{color: 'white'}}
                placeholder="Where You are Going ?"
                placeholderTextColor={'gray'}
                elevation={2}
                onChangeText={() => {
                  <BottomScroll />;
                }}
                value={searchQuery}
              />
            </View>
          </View>
          <ScrollView
            style={{marginLeft: 25, marginTop: 20}}
            showsVerticalScrollIndicator={false}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  fontFamily: fonts.medium,
                }}>
                Category
              </Text>
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
            </View>
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
          </ScrollView>
        </View>
      )}
    </View>
  );
}
