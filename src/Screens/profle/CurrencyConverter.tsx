import axios from 'axios';
import {useEffect, useState} from 'react';
import {ImageBackground, Text} from 'react-native';

export function CurrencyConvert() {
  const [currency, setCurrency] = useState();
  console.log(currency);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://www.nrb.org.np/api/forex/v1/rates/?from=2023-02-05&to=2023-02-06&per_page=100&page=1',
    })
      .then(res => setCurrency(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
      <ImageBackground
        style={{flex: 1}}
        source={{
          uri: 'https://img.freepik.com/premium-vector/forex-trading-background_23-2148583926.jpg?w=2000',
        }}></ImageBackground>
    </>
  );
}
