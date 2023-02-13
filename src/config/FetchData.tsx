import axios from 'axios';
import {BACKEND_API} from './constraint';

export function fetchBackend(method: string, url: string, data?: any) {
  console.log(url);
  try {
    const datas = axios({
      method,
      url: `${BACKEND_API}${url}`,
      data: data,
    })
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err.data);
      });
    return datas;
  } catch (err) {
    console.log(err);
    return err;
  }
}
