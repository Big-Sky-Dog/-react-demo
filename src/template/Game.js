import React from 'react'

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
      <div>
        <div>Game</div>
      </div>
    )
  }
}

export default Game