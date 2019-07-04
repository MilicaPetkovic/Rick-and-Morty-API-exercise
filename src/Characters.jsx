import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-items: center;
  padding: 30px 0;
`;

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true
    };
  }
  async componentDidMount() {
    const url = "https://rickandmortyapi.com/api/character/";
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    this.setState({
      items: data.results,
      loading: false,
      id: data.results.id
    });
  }

  render() {
    let { items, loading } = this.state;
    console.log(this.props);
    // console.log(items);
    // console.log(this.props.match.params);
    return (
      <div className="App">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Container>
            {items.map(item => (
              <div key={item.id}>
                <Router>
                  <Link to={`${item.id}`}>
                    <img src={item.image} alt="img" />
                    <p>{item.name}</p>
                  </Link>
                </Router>
              </div>
            ))}
          </Container>
        )}
        {/* <Info /> */}
      </div>
    );
  }
}

export default Characters;
