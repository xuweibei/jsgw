import React from 'react';


export default class Test extends React.Component {
  state = {
    obj: {}
  }

  componentDidMount() {

    this.test()
  }
  test = () => {
    fetch('http://localhost:8000/api/test')
    .then(res => res.json())
    .then(response => {
      this.setState({
        obj: response[0]
      })
    })
  }
  render () {
    const {obj} = this.state;
    console.log(obj)
    return (
      <div>
          {/* <button onClick={this.test}>测试</button> */}
          <div style={{color: "#000"}}>{obj.name}</div>
          <div style={{color: "#000"}}>{obj.age}</div>
      </div>
    )
  }
}
