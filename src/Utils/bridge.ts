import axios from 'axios';
import {BACKEND_API} from '../config/constraint';

export const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => error,
);

export async function fetchUserInfo(jwt: string) {
  console.log('this is jwt', jwt);
  const res = await axiosInstance.get('/auth/info/me', {
    headers: {Authorization: `Bearer ${jwt}`},
  });
  return res;
}

// heritage bridge
export async function fetchHeritages() {
  const res = await axiosInstance.get('/heritage');
  return res;
}

export async function fetchIndividualHeritage(heritageId: string) {
  return await axiosInstance.get(`/heritage/${heritageId}`);
}

// Category Section

export async function fetchCategories() {
  const res = await axiosInstance.get('/category');
  return res;
}

// plans

export async function fetchUserPlans(jwt: string) {
  const res = await axiosInstance.get('/plans', {
    headers: {Authorization: `Bearer ${jwt}`},
  });
  return res;
}

// packages

export async function fetchPackage() {
  const res = await axiosInstance.get('/packages');
  return res;
}
