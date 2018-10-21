import React, {Component} from 'react'
import axios from "axios"

import AnuncioHome from './AnuncioHome'

// https://mercadodev-ba418.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22para-sua-casa%22

class Categoria extends Component {
  constructor(props){
    super(props)
    this.state = {
      anuncios : {}
    }
    this.loadAnuncios =  this.loadAnuncios.bind(this)
    this.loadAnuncios(this.props.match.params.urlCategoria)
  }
  loadAnuncios(urlCategoria){
    const url = `https://mercadodev-ba418.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22`
    axios.get(url).then(json => {
      this.setState({ anuncios : json.data })
      this.categoria = urlCategoria
    })
  }
  componentWillReceiveProps(newProps){
    if(newProps.match.params.urlCategoria){
      if(this.categoria !== newProps.match.params.urlCategoria)
        this.loadAnuncios(newProps.match.params.urlCategoria)
    }
  }
  render() {
    return(
      <div>
        <h1>categoria:{JSON.stringify(this.props.match.params.urlCategoria)}</h1>
        <p>
          {Object.keys(this.state.anuncios).map(key =>{
              const anuncio = this.state.anuncios[key]
              return <AnuncioHome key={key} anuncio={anuncio} />
            })
          }

        </p>
      </div>
    )
  }
}
export default Categoria
