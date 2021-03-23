import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// global axios defaults
// baseURL - автоматически добавляется в адресе перед /
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// добавление токена, если он у нас есть для авторизации - обычно переменная
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// указазывает тип контента в post request
// по умолчанию он application/json
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Делает перехват запроса во всех компонентах глобально
// request interceptor
// ошибки будут выдаваться, только если это ошибка отправки запроса
axios.interceptors.request.use(request => {
	console.log(request);
	// Обязательно нужно возвратить config request-а,
	// иначе мы блокируем его отправку
	return request;
}, error => {
	console.log(error);
	return Promise.reject(error);
});

// response interceptor
// // ошибки будут выдаваться, только если это ошибка получения ответа
axios.interceptors.response.use(response => {
	console.log(response);
	return response;
}, error => {
	console.log(error);
	return Promise.reject(error);
})


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
