import axios from 'axios'
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return err
  }
)
