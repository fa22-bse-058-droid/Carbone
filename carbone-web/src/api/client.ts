import axios from 'axios'

const client = axios.create({
  baseURL: 'https://carbone-production-bfeb.up.railway.app/api',
})

export default client