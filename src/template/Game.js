import React from 'react'
import 'style/game.less'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        route: props.route,
    }
  }

  componentDidMount() {
    this.props.location.query.changeTitle('Game')
  }
  

  render() {
    return (
      <div className="game">
        <div>flash game</div>
        <embed
          id="flashgame1" 
          name="flashgame" 
          src='http://127.0.0.1:8080/public/11.swf'
          quality="high"
          pluginspage="http://www.macromedia.com/go/getflashplayer"
          type="application/x-shockwave-flash"
          width="500"
          height="305"
          allowscriptaccess="nerver"
          allownetworking="internal"
        ></embed>
      </div>
    )
  }
}

export default Game