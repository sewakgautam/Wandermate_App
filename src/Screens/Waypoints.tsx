import {Image, Text, View, StyleSheet} from 'react-native';
import {color, Route} from '../config/constraint';
import MapboxGL from '@rnmapbox/maps';
import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useQuery} from 'react-query';
import {fetchHeritages} from '../Utils/bridge';
import {Button} from 'react-native-paper';
import {Linking} from 'react-native';
import axios from 'axios';

MapboxGL.setWellKnownTileServer('Mapbox');
const access_token =
  'sk.eyJ1IjoiaGl0Y29kZSIsImEiOiJjbGRwdGRnZHMwMDdmM25tc3RlN2d6MjhyIn0.6OyyyxC0yWw8wS7aBFf1Ww';
MapboxGL.setAccessToken(access_token);

export default function WayPoints({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  navigation.setOptions({title: `Trip to ${route.params.placeName}`});
  const [coordinate, setCoordinate] = useState<[number, number]>([
    87.3014093, 26.6554599,
  ]);
  const [geoCoding, setGeoCoding] = useState<[]>([]);
  // console.log(coordinate);

  // console.log(geoCoding);
  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setCoordinate([
        info?.coords?.longitude ?? 87.3054946,
        info?.coords?.latitude ?? 26.6574451,
      ]),
    );
    // accessing the user current location and setting it on the state
  }, [coordinate]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${
            coordinate[0]
          },${coordinate[1]};${(route?.params?.destination).split(
            ',',
          )}?geometries=geojson&access_token=${access_token}`,
        )
        .then(res => {
          // console.log(res.data?.routes[0].geometry.coordinates);
          setGeoCoding(res.data?.routes[0].geometry.coordinates);
        })
        .catch(() => {
          console.log('map route data fetch error ');
        });
    } catch (err) {
      console.log('map route data fetch error ');
    }
  }, [route]);
  // const {data: heritage} = useQuery('allHeritages', () => fetchHeritages());
  // random generated geojson feature
  const GeoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: geoCoding,
          // coordinates: [
          //   [-101.744384, 39.32155],
          //   [-101.552124, 39.330048],
          //   [-101.403808, 39.330048],
          //   [-101.332397, 39.364032],
          //   [-101.041259, 39.368279],
          //   [-100.975341, 39.304549],
          //   [-100.914916, 39.245016],
          //   [-100.843505, 39.164141],
          //   [-100.805053, 39.104488],
          //   [-100.491943, 39.100226],
          //   [-100.437011, 39.095962],
          //   [-100.338134, 39.095962],
          //   [-100.195312, 39.027718],
          //   [-100.008544, 39.010647],
          //   [-99.865722, 39.00211],
          //   [-99.684448, 38.972221],
          //   [-99.51416, 38.929502],
          //   [-99.382324, 38.920955],
          //   [-99.321899, 38.895308],
          //   [-99.113159, 38.869651],
          //   [-99.0802, 38.85682],
          //   [-98.822021, 38.85682],
          //   [-98.448486, 38.848264],
          //   [-98.206787, 38.848264],
          //   [-98.020019, 38.878204],
          //   [-97.635498, 38.873928],
          // ],
        },
      },
    ],
  };

  // const finalDestination = destination.split(',');

  return (
    <MapboxGL.MapView
      styleURL={MapboxGL.StyleURL.SatelliteStreet}
      style={{flex: 1}}>
      <MapboxGL.Camera
        defaultSettings={{
          centerCoordinate: coordinate,
          zoomLevel: 5,
        }}
      />
      <MapboxGL.PointAnnotation
        id="pointer"
        snipped={'sewak palace'}
        coordinate={coordinate}>
        <MapboxGL.Callout
          title={'Your Location'}
          containterStyle={{flex: 1, background: '#fff'}}
        />
        {/* <MapboxGL.CircleLayer id={''} /> */}
      </MapboxGL.PointAnnotation>
      <MapboxGL.PointAnnotation
        id="pointer2"
        coordinate={route?.params?.destination.split(',')}>
        <MapboxGL.Callout
          title={route.params.placeName}
          containterStyle={{flex: 1, background: '#fff'}}
        />
      </MapboxGL.PointAnnotation>

      <MapboxGL.ShapeSource id={'some-feature'} shape={GeoJson}>
        <MapboxGL.LineLayer
          sourceID="some-feature"
          id="some-feature-line"
          type="line"
          style={{
            lineColor: 'red',
            lineWidth: 3,
            lineJoin: 'round',
            lineCap: 'round',
          }}
        />
      </MapboxGL.ShapeSource>
    </MapboxGL.MapView>
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
