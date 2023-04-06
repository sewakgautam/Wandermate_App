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
  const [pinPoint, setPinPoint] = useState<[]>([]);
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
  // console.log(route.params.destinations);

  useEffect(() => {
    const data = route?.params?.destination;
    const formattedData = data
      .map(item => {
        const [lat, long] = item.split(',');
        return `${lat},${long}`;
      })
      .join(';');
    console.log(formattedData);
    try {
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinate[0]},${coordinate[1]};${formattedData}?geometries=geojson&access_token=${access_token}`,
        )
        .then(res => {
          // console.log(res.data?.routes[0].geometry.coordinates);
          setGeoCoding(res.data?.routes[0].geometry.coordinates);
          setPinPoint(res.data?.waypoints);
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
  const pinPoints = pinPoint?.map(each => (
    <MapboxGL.PointAnnotation
      id="pointer"
      snipped={each.name}
      coordinate={each.location}>
      <MapboxGL.Callout
        title={each.name}
        containterStyle={{flex: 1, background: '#fff'}}
      />
    </MapboxGL.PointAnnotation>
  ));

  // console.log(pinPoint);

  const GeoJson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: geoCoding,
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
      {pinPoints}
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
