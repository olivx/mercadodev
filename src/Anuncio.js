import React, {Component } from 'react'
import axios from 'axios'

class Anuncio extends Component{
  constructor(props){
    super(props)
    this.state = {
      anuncio: {},
      isLoading: true
    }

    const idAnuncio = this.props.match.params.idAnuncio
    const url = `https://mercadodev-ba418.firebaseio.com/anuncios/${idAnuncio}.json`
    axios
      .get(url)
      .then( json => {
        this.setState({
          anuncio:json.data,
          isLoading:false
        })
      })
  }
  render(){
    const anuncio = this.state.anuncio
    return (
      <div>
        {this.state.isLoading && <div className="text-center">
          <i  style={{ fontSize: '15em' }} className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>}
      <h1>{anuncio.nome}</h1>
        <p>
          <img src={anuncio.foto} alt="" />
        </p>
      </div>
    )
  }
}

export default Anuncio
