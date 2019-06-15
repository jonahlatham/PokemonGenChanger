import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Pokemon from './Pokemon/Pokemon'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const generation = ['',1, 2, 3, 4, 5, 6, 7]

class App extends Component {
  state = {
    searchText: "",
    start: 1,
    end: 151,
    dataLoop: [],
    filterPokemon: [],
    loading: true,
  }

  componentDidMount() {
    this.getPokemon()
  }

  getPokemon = () => {

    const pokeData = [];
    for (let i = this.state.start; i <= this.state.end; i++) {
      pokeData.push(axios.get(`${baseUrl}/${i}`))
    }
    Promise.all(pokeData)
      .then((response) => {

        this.setState({
          dataLoop: response.map((e, i) => {
            console.log(e.data)
            return e.data
          }),
          filterPokemon: response.map((e) => {
            return e.data
          }),
          loading: false
        })
      })
  }

  filterPokemon = (event) => {
    const pokemonFilter = this.state.dataLoop.filter((e) => {
      return e.name.includes(event.target.value)
    })
    this.setState({
      searchText: event.target.value,
      filterPokemon: pokemonFilter
    })
  }


  selectGen = (event) => {

    let start;
    let end;
    switch (Number(event.target.value)) {
      case 1:
        // event.target.value === Gen1;
        start = 1;
        end = 151;
        break;
      case 2:
        // event.target.value === Gen2;
        start = 152;
        end = 251;
        break;
      case 3:
        // event.target.value === Gen3;
        start = 252;
        end = 386;
        break;
      case 4:
        // event.target.value === Gen4;
        start = 387;
        end = 493;
        break;
      case 5:
        // event.target.value === Gen5;
        start = 494;
        end = 649;
        break;
      case 6:
        // event.target.value === Gen6;
        start = 650;
        end = 721;
        break;
      case 7:
        // event.target.value === Gen7;
        start = 722;
        end = 807;
    }
    this.setState({
      start,
      end,
      loading: true
    }, this.getPokemon)

  }

  render() {
    const genSelect = generation.map((e, i) => {
      return <option value={e} key={i}>{e}</option>
    })
    return (
      <div className="App">
      <div className="head">Be the Best</div>
      {
        this.state.loading ? <div className="loader"></div>
        : <div>
          <input className="search-box" onChange={this.filterPokemon} placeholder="Filter Pokemon" type="text" value={this.state.searchText} name="searchText" />
          <select onChange={this.selectGen}>{genSelect}</select>
          <div className="pokemon">
            <Pokemon poke={this.state.filterPokemon} />
          </div>
        </div>
      }

      </div>
    );
  }
}

export default App;