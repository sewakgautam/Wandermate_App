import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Entypo from 'react-native-vector-icons/Entypo';

const currentDate = new Date();
const dayHour = currentDate.getHours();
var Greetings: string;
if (dayHour <= 11) {
  Greetings = 'Good Morning';
} else if (dayHour <= 13) {
  Greetings = 'Good Afternoon';
} else if (dayHour <= 19) {
  Greetings = 'Good Evening';
} else {
  Greetings = 'Good Night';
}

export default function HomePage() {
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

  return (
    <>
      <View>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1607836046730-3317bd58a31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
          style={{height: 300}}>
          <View
            style={{
              top: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            <View
              style={{
                backgroundColor: 'hsla(0, 1%, 100%, 0.57)',
                borderRadius: 10,
                flexDirection: 'row',
                gap: 10,
                padding: 10,
              }}>
              <Image
                source={{
                  uri: 'https://variety.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-02-at-8.33.52-AM.png',
                }}
                style={{
                  resizeMode: 'contain',
                  height: 30,
                  width: 30,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{fontSize: 10}}>{Greetings}!</Text>
                <Text style={{fontWeight: 'bold'}}>Sewak Gautam</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0.5,
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: 'hsla(0, 1%, 100%, 0.57)',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 20, lineHeight: 30, fontWeight: 'bold'}}>
                  {(+weather.temp | 0) - 3}
                </Text>
                {/* decreasing the weather value by 3 beacaues while testing we got temperature more than 3 from the real temperature */}
                <Text style={{fontSize: 15, lineHeight: 20}}>o</Text>
                <Text style={{fontSize: 18, lineHeight: 25}}>C</Text>
              </View>
              <Image
                source={{uri: `http:${weather.icon}`}}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </View>
          </View>
        </ImageBackground>
        <View>
          <Searchbar
            style={{
              top: -20,
              justifyContent: 'center',
              marginHorizontal: 20,
              borderRadius: 5,
            }}
            selectionColor="#0D3A83"
            placeholder="Where You are Going ?"
            placeholderTextColor={'gray'}
            elevation={2}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
      </View>
      <ScrollView style={{marginLeft: 20}}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Explore Nepal</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              paddingVertical: 10,
              color: '#0D3A83',
            }}>
            Recommended
          </Text>
          <ScrollView horizontal style={{height: 240}}>
            <View
              style={{
                backgroundColor: 'white',
                elevation: 5,
                marginLeft: 10,
                height: 230,
                width: 180,
                borderRadius: 20,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
                }}
                style={{
                  resizeMode: 'cover',
                  margin: 10,
                  height: 130,
                  width: 160,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 20,
                }}>
                Kanyam
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo name={'location-pin'} size={20} color={'#0D3A83'} />
                  <Text style={{fontSize: 15, fontWeight: '700'}}>Ilam</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: 50,
                    paddingHorizontal: 10,
                  }}>
                  <Text>200 Km away</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                elevation: 5,
                marginLeft: 10,
                height: 230,
                width: 180,
                borderRadius: 20,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1620903376453-25f5a6fd533e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
                }}
                style={{
                  resizeMode: 'cover',
                  margin: 10,
                  height: 130,
                  width: 160,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 20,
                }}>
                Kanyam
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo name={'location-pin'} size={20} color={'#0D3A83'} />
                  <Text style={{fontSize: 15, fontWeight: '700'}}>Ilam</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: 50,
                    paddingHorizontal: 10,
                  }}>
                  <Text>200 Km away</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                elevation: 5,
                marginHorizontal: 10,
                height: 230,
                width: 180,
                borderRadius: 20,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1544015759-237f87d55ef3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
                }}
                style={{
                  resizeMode: 'cover',
                  margin: 10,
                  height: 130,
                  width: 160,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                  paddingBottom: 10,
                  fontSize: 20,
                }}>
                Kanyam
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{flexDirection: 'row'}}>
                  <Entypo name={'location-pin'} size={20} color={'#0D3A83'} />
                  <Text style={{fontSize: 15, fontWeight: '700'}}>Ilam</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    borderRadius: 50,
                    paddingHorizontal: 10,
                  }}>
                  <Text>200 Km away</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}
