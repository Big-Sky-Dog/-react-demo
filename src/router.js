// this's views
import Home from './Home'
import Content from './Content'
import Weather from 'template/Weather'
import Game from 'template/Game'

const router = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/content',
    component: Content,
    child: [
      {
        path: '/content/weather',
        component: Weather
      },
      {
        path: '/content/game',
        component: Game
      }
    ]
  }
]

export {router}
