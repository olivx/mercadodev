import React, {Component} from 'react'
import axios from "axios"

import AnuncioHome from './AnuncioHome'

// https://mercadodev-ba418.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22para-sua-casa%22

class Categoria extends Component {
  constructor(props){
    super(props)
    this.state = {
      anuncios : {},
      isLoading: true
    }
    this.loadAnuncios =  this.loadAnuncios.bind(this)
    this.loadAnuncios(this.props.match.params.urlCategoria)
  }
  loadAnuncios(urlCategoria){
    this.setState({anuncios : {}})
    const url = `https://mercadodev-ba418.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22`
    axios.get(url).then(json => {
      this.setState({ anuncios : json.data, isLoading: false})
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
    const categoria = this.props.match.params.urlCategoria
    return(
      <div>
        <h1>categoria: &nbsp; {categoria}</h1>
          {this.state.isLoading && <div className="text-center">
            <i  style={{ fontSize: '15em' }} className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
          </div>}
        <div className="row">
          {Object.keys(this.state.anuncios).map(key =>{
              const anuncio = this.state.anuncios[key]
              return <AnuncioHome key={key} id={key} anuncio={anuncio} />
            })
          }
        </div>
        {Object.keys(this.state.anuncios).length === 0 && <p>Nenhum prodtudo cadastrado.</p>}
      </div>
    )
  }
}
export default Categoria
