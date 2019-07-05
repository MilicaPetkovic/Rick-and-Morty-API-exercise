import React, { Component } from "react";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: "",
        created: "",
        gender: "",
        id: null,
        image: "",
        location: {
          name: "",
          url: ""
        },
        species: "",
        status: "",
        type: "",
        url: ""
      },
      loading: true,
      error: false
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;

    const url = "https://rickandmortyapi.com/api/character/" + id;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      this.setState({
        info: {
          name: data.name,
          created: data.created,
          gender: data.gender,
          id: data.id,
          image: data.image,
          location: {
            name: data.location.name,
            url: data.location.url
          },
          species: data.species,
          status: data.status,
          type: data.type,
          url: data.url
        },
        loading: false
      });
    } catch (error) {
      this.setState({ error }, () => console.error(this.state.error));
    }
  }

  render() {
    let { info, loading, error } = this.state;

    return (
      <div>
        {error && <h1>Sum Ting Went Wong</h1>}
        {loading && !error ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <img src={info.image} alt={info.name} />
            <p>{info.status}</p>
            <p>{info.species}</p>
            <p>{info.type}</p>
            <p>{info.gender}</p>
            <p>{info.name}</p>
            <p>{info.created}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Info;
