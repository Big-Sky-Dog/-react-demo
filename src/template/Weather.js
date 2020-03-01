import React from 'react'
import $http from '$http'

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
    }
  }

  componentDidMount() {
    showMessage('看看今天的天气吧~', 3000)
    this.props.location.query.changeTitle('Weather')

    this.getWeatherData()
  }

  getWeatherData() {
    $http.get($http.city, returnCitySN.cip).then(res => {
      if (res.data.code == 0) return res.data.data.city
      else return null
    }).then(city => {
      if (!city) return console.error('error from AL')
      const url = 'http://wthrcdn.etouch.cn/weather_mini?city='
      $http.get(url + city).then(res => {
        if (!res.data.error) this.setState({
          weather: res.data
        }, () => {
          console.log(this.state.weather)
        })
        else console.info(res)
      })
    })
  }

  render() {
    return (
      <div>
        <div>Weather</div>
      </div>
    )
  }
}

export default Weather