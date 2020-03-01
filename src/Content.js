import React from 'react'
import 'style/content.less'
import { Button } from 'antd'
import { renderRoutes } from 'react-router-config'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    this.titleChange(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.titleChange(nextProps)
  }

  // functions
  titleChange(props) {
    if (props.location.query) 
      this.setState({
        title: props.location.query.msg
      })
    else if (this.state.title != 'What do you want?') 
      this.setState({
        title: 'What do you want?'
      })
  }

  toChlid(path) {
    this.props.history.push({
      pathname: path,
      query: {
        changeTitle: (str) => {
          this.setState({
            title: str
          })
        }
      }
    })
  }

  render() {
    return (
      <div className="content">
        <div className="main">
          <div className="title">
            <span>{this.state.title}</span>
            <Button type="primary" onClick={() => {history.back()}}>Go back</Button>
          </div>
          <div id="Content">
            {
              window.location.pathname == '/content' ?
              <ul>
                <li><a onClick={this.toChlid.bind(this, '/content/weather')}>to Weather</a></li>
                <li><a onClick={this.toChlid.bind(this, '/content/game')}>to Game</a></li>
              </ul> :
              renderRoutes(this.props.route.child)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Content