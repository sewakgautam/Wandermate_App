import {Image, Text, View, StyleSheet} from 'react-native';
import {color} from '../config/constraint';
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
            // followZoomLevel={1}
            followUserLocation
            centerCoordinate={coordinate}
            allowUpdates
          />
          <MapboxGL.PointAnnotation
            id="pointer"
            snipped={'sewak palace'}
            coordinate={coordinate}
          />
          {/* {pointer} */}
        </MapboxGL.MapView>
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
