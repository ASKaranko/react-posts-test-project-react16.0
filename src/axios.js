import axios from 'axios';

// instance axios используется для раздделения, если
// для разных компонент нужны разные настройки baseURL, headers
const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

instance.interceptors.request.use(request => {
	console.log(request);
	return request;
})

export default instance;