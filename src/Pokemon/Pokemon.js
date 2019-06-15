import React, { Component } from 'react'
import './Pokemon.css'

class Pokemon extends Component {
    render() {
        const pokemon = this.props.poke.map((e,i) => {
            return <div className="pokemonSprites" key={i}><img src={e.sprites.front_default} key={i}/><br/>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</div>
          })
        return (
            <div  className="pokemonCards">
                {pokemon}
            </div>
        )
    }
}

export default Pokemon
