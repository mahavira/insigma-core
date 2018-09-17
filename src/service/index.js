import Vue from 'vue';
import axios from 'axios';
import {
  SERVICE_HOST,
  SERVICE_BASE_URL,
} from '../config';

const service = axios.create({
  baseURL: SERVICE_HOST + SERVICE_BASE_URL,
  timeout: 30000,
});
Vue.prototype.$http = service;
