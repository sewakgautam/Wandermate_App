import axios from 'axios';
import {useEffect, useState} from 'react';
import {ImageBackground, Text} from 'react-native';
import WebView from 'react-native-webview';

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
      <WebView
        scalesPageToFit={false}
        source={{
          html: '<iframe src="https://nepalicalendar.rat32.com/embed-forex.php" frameborder="30" scrolling="no" marginwidth="0" marginheight="0" style="border:none; overflow:hidden; width:100%; height:1200; border-radius:5px;padding:0px;margin:0px;" allowtransparency="true"></iframe>',
        }}
      />
    </>
  );
}
