// import axios, { AxiosRequestHeaders } from 'axios';
import axios from 'axios';
// import Dialog from '@/components/Dialog'
// import { useUserStore } from '@/store/user';
import {router} from '../router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 60000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // const userStore = useUserStore()

  // if(userStore.token) {
  //   config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${userStore.token}`
  //   } as AxiosRequestHeaders
  // }
  
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // if(response.status === 200 || response.status === 201) {
  //   return response.data
  // }
  if(response.status.toString().startsWith('2')) {
    return response.data
  }
  // console.log(response)
  // return response.data
  // Dialog(response.data.message)
  return Promise.reject('error');
  // return response;
}, function (error) {
  const response = error.response

  if(!response) {
    return Promise.reject(error);
  }
  
  if(response.config.headers.once) {
    return Promise.reject(error);
  }

  if(response.data.statusCode && response.data.statusCode === 401) {
    // useUserStore().logout(false)
    router.replace('/login')
  }

  try {
    let msg = error.response.data.message
    
    if(msg instanceof Array && msg.length > 0) {
      msg = msg[0]
    }
    
    // Dialog(msg)
  } catch (error) {
    
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance
