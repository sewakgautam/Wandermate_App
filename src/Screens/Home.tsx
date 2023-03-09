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
import {FestivalCard} from '../Components/FestivalsCard';

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
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
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
                uri: 'https://images.goodsmile.info/cgm/images/product/20200513/9505/69654/large/a3b56bccc98a8d4282224f40806415ff.jpg',
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
                  fontSize: 20,
                  fontFamily: fonts.bold,
                }}>
                Sewak Gautam
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
            <CategoryCard
              categoryName={'Lakes'}
              categoryImage={
                'https://cdn-icons-png.flaticon.com/512/2151/2151296.png'
              }
            />
            <CategoryCard
              categoryName={'River'}
              categoryImage={
                'https://www.pngall.com/wp-content/uploads/9/City-River-PNG-Clipart.png'
              }
            />
            <CategoryCard
              categoryName={'Mountains'}
              categoryImage={
                'https://static.vecteezy.com/system/resources/previews/014/037/394/original/illustration-of-mountains-png.png'
              }
            />
            <CategoryCard
              categoryName={'Beach'}
              categoryImage={
                'https://static.vecteezy.com/system/resources/previews/010/794/497/original/beach-3d-illustration-png.png'
              }
            />
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
            <HeritageCard
              imageLink={
                'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
              }
              planceName={'Kanyam'}
              address={'Ilam'}
              farFromUser={'2 Hour'}
            />
            <HeritageCard
              imageLink={
                'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
              }
              planceName={'Kanyam'}
              address={'Ilam'}
              farFromUser={'200 Km away'}
            />
            <HeritageCard
              imageLink={
                'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
              }
              planceName={'Kanyam'}
              address={'Ilam'}
              farFromUser={'200 Km away'}
            />
            <HeritageCard
              imageLink={
                'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
              }
              planceName={'Kanyam'}
              address={'Ilam'}
              farFromUser={'200 Km away'}
            />
          </ScrollView>
        </View>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              fontFamily: fonts.medium,
            }}>
            Upcoming Festivals
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginVertical: 10}}>
            <FestivalCard
              festivalDescription={
                'Dashain or Badadashain, also referred as Bijaya Dashami in Sanskrit, is a major Hindu religious festival in Nepal. It is also celebrated by Hindus of Nepal and elsewhere in the world ....'
              }
              festivalTitle={'Dashain'}
              festivalImage={
                'https://myrepublica.nagariknetwork.com/uploads/media/1506759324794_RS_KTM_20170930__MG_0473.JPG'
              }
            />
            <FestivalCard
              festivalDescription={
                'Tihar (also known as Deepawali and Yamapanchak) is a five-day Hindu festival celebrated in Nepal and the Indian states of Sikkim and West Bengal, ....'
              }
              festivalTitle={'Tihar'}
              festivalImage={
                'https://data.tibettravel.org/assets/images/nepal/nepal-festival/nepal-light-festival.jpg'
              }
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
