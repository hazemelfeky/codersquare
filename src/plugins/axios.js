import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")? "Bearer " + localStorage.getItem("token") : null;
axios.defaults.headers.common['Content-Type'] = "application/json"
