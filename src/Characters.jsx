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
  state = {
    items: [],
    nextURL: null,
    prevURL: null,
    loading: true
  };

  // async fetchData(url = "https://rickandmortyapi.com/api/character/") {} - nije bind-ovano na Characters
  fetchData = async (url = "https://rickandmortyapi.com/api/character/") => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    this.setState(
      {
        items: data.results,
        loading: false,
        id: data.results.id,
        nextURL: data.info.next,
        prevURL: data.info.prev
      },
      () => console.log(this.state)
    );
  };

  componentDidMount = () => this.fetchData();

  render() {
    let { items, loading, nextURL, prevURL } = this.state;
    console.log(this.props);
    console.log(items);

    // console.log(this.props.match.params);
    return (
      <div className="App">
        <h1>Characters</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Container>
            <button onClick={() => prevURL && this.fetchData(prevURL)}>
              Previous page
            </button>
            <button onClick={() => nextURL && this.fetchData(nextURL)}>
              Next page
            </button>
            {items.map(item => (
              <div key={item.id}>
                <Link to={`/${item.id}`}>
                  <img src={item.image} alt="img" />
                  <p>{item.name}</p>
                </Link>
              </div>
            ))}
          </Container>
        )}
      </div>
    );
  }
}

export default Characters;
