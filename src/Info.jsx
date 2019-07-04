import React, { Component } from "react";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: []
    };
  }

  async componentDidMount() {
    const url = "https://rickandmortyapi.com/api/character/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      info: data.results
    });
  }

  render() {
    let { info } = this.state;
    return (
      <div>
        {info.map(item => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.status}</p>
            <p>{item.species}</p>
            <p>{item.type}</p>
            <p>{item.gender}</p>
            <p>{item.origin.name}</p>
            <p>{item.created}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Info;
