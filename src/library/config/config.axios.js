import Vue from 'vue';
import axios from 'axios';
import DefaultSetting from './config.setting';
import Objects from '../util/objects';

const Interceptor = {
  RequestSuccess: 'request.success',
  RequestError: 'request.error',
  ResponseSuccess: 'response.success',
  ResponseError: 'response.error',
};

const interceptors = {
  [Interceptor.RequestSuccess]: [],
  [Interceptor.RequestError]: [],
  [Interceptor.ResponseSuccess]: [],
  [Interceptor.ResponseError]: [],
};

const getInterceptors = () => {
  const getConfig = (type, source) => {
    const _interceptors = interceptors[type];
    if (!_interceptors) {
      return source;
    }
    return _interceptors.reduce((config, interceptor) => {
      return interceptor(config, Objects.clone(source));
    }, Objects.clone(source));
  };

  const onRequestSuccess = (config) => getConfig(Interceptor.RequestSuccess, config);

  const onRequestError = (err) => getConfig(Interceptor.RequestError, err);

  const onResponseSuccess = (response) => getConfig(Interceptor.ResponseSuccess, response);

  const onResponseError = (err) => getConfig(Interceptor.ResponseError, err);

  return [onRequestSuccess, onRequestError, onResponseSuccess, onResponseError];
};

const init = (setting = DefaultSetting) => {
  const axiosSetting = setting.axios;

  const instance = axios.create(axiosSetting);

  const [onRequestSuccess, onRequestError, onResponseSuccess, onResponseError] = getInterceptors();
  instance.interceptors.request.use(onRequestSuccess, onRequestError);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  Vue.prototype.$axios = instance;
};

const addInterceptor = (name, interceptor) => {
  const whiteList = Object.values(Interceptor);
  if (!whiteList.includes(name)) {
    console.warn(`只支持添加 ${whiteList.join('/')} 拦截器`);
    return;
  }
  interceptors[name].push(interceptor);
};

export default {
  init,
  Interceptor,
  addInterceptor,
};
