import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import 'react-native-url-polyfill/auto';

const client = createClient({
  projectId: 'zpj6qd2o', // sanity.config.ts 혹은 sanity사이트에 있음
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;

// http://localhost:19000이랑 http://localhost:3000를 CORS origins 리스트에 적어두기
// 방법 1 ) https://www.sanity.io/manage/personal/project/(프로젝트ID)/api에 CORS origins 적기
// 방법 2 ) cd sanity --> sanity cors add http://localhost:19000
