import axios from 'axios'
import qs from 'qs'

const request = {
  city: 'myApi/service/getIpInfo.php?ip=',

  get: (url, data) => {
    const str = data ? url + data : url
    return axios.get(str)
  }
}

export default request