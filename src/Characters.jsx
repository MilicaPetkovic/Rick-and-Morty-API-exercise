import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-items: center;
  padding: 30px 0;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 60px 55px;
  button {
    border: none;
    background-color: #0c570e;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    outline: none;
  }
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

class Characters extends Component {
  state = {
    items: [],
    nextURL: null,
    prevURL: null,
    loading: true
  };

  fetchData = async (url = "https://rickandmortyapi.com/api/character/") => {
    const response = await fetch(url);
    const data = await response.json();
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

    return (
      <div>
        <Image>
          <img
            src="https://fontmeme.com/permalink/190705/292a19e694097908d56c1cd18ca128ed.png"
            alt="get-schwifty-font"
            border="0"
          />
        </Image>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Container>
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
        <Buttons>
          <button onClick={() => prevURL && this.fetchData(prevURL)}>
            Previous page
          </button>
          <button onClick={() => nextURL && this.fetchData(nextURL)}>
            Next page
          </button>
        </Buttons>
      </div>
    );
  }
}

export default Characters;
