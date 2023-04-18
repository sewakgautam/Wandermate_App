import {View, StyleSheet} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useQuery} from 'react-query';
import {fetchHeritages} from '../Utils/bridge';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'sk.eyJ1IjoiaGl0Y29kZSIsImEiOiJjbGRwdGRnZHMwMDdmM25tc3RlN2d6MjhyIn0.6OyyyxC0yWw8wS7aBFf1Ww',
);
export default function Maps() {
  const [coordinate, setCoordinate] = useState<[number, number]>([
    87.3054946, 26.6574451,
  ]);

  var {data: heritageDatas} = useQuery('allHeritages', () => fetchHeritages(), {
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 1000,
  });
  heritageDatas = heritageDatas?.data;

  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setCoordinate([
        info?.coords?.longitude ?? 87.3054946,
        info?.coords?.latitude ?? 26.6574451,
      ]),
    );
    // accessing the user current location and setting it on the state
  }, []);

  // const {data: heritage} = useQuery('allHeritages', () => fetchHeritages());
  // console.log(heritageDatas);
  const heritageList = heritageDatas?.map((heritage: any) => (
    <MapboxGL.PointAnnotation
      key={heritage.id}
      id={heritage.id}
      snipped={'sewak palace'}
      coordinate={(heritage?.latandlong).split(',')}>
      <MapboxGL.Callout title={heritage.title} />
    </MapboxGL.PointAnnotation>
  ));

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.SatelliteStreet}
          compassEnabled={true}
          userTrackingMode
          logoEnabled
          surfaceView
          zoomEnabled={true}
          // visibleCoordinateBounds={[87.3054946, 26.6574451]}
          visibleCoordinateBounds={coordinate}
          compassViewMargins={{x: 59, y: 17}}>
          <MapboxGL.Camera
            zoomLevel={15}
            followZoomLevel={15}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserLocation
            // followUserMode="UserTrackingMode"
            centerCoordinate={coordinate}
            allowUpdates
          />

          <MapboxGL.PointAnnotation
            id="pointer"
            snipped={'sewak palace'}
            coordinate={coordinate}>
            <View
              style={{
                height: 15,
                width: 15,
                backgroundColor: '#004DAA',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 2,
              }}
            />
            <MapboxGL.Callout
              title={'Your Location'}
              containterStyle={{flex: 1, background: '#fff'}}
            />
            {/* <MapboxGL.CircleLayer id={''} /> */}
          </MapboxGL.PointAnnotation>
          {heritageList}

          {/* {pointer} */}
        </MapboxGL.MapView>
        {/* <View
          style={{
            top: '5%',
            right: '5%',
            // backgroundColor: color.Primary,
            borderRadius: 50,
            position: 'absolute',
            borderColor: 'white',
          }}>
          <Button
            icon="map"
            style={{borderColor: 'white'}}
            mode="outlined"
            textColor="white"
            onPress={() => {
              navigation.navigate(Route.Navigation);
              // console.log('hit');
              // Linking.openURL('maps://');
            }}>
            Navigation
          </Button>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {height: '100%', width: '100%'},
});
