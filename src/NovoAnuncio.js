import React, { Component } from 'react';
import HeaderInterno from './HeaderInterno'
import base, { storage } from './base'
import {Redirect} from 'react-router-dom'

class NovoAnuncio extends Component {
  constructor(props){
    super(props)
    this.state = {
      success: false
    }
    this.handleSubimit = this.handleSubimit.bind(this)
  }

  handleSubimit(e){
    const file = this.foto.files[0]
    const {name, size} = file
    const ref = storage.ref(name)
    ref
      .put(file)
      .then(img => {
        console.log(img)
        return ref.getDownloadURL().then(url => {
          const novoAnuncio = {
               nome: this.nome.value,
               preco: this.preco.value,
               vendedor: this.vendedor.value,
               telefone: this.telefone.value,
               descricao: this.descricao.value,
               categoria: this.categoria.value,
               foto: url
             }
         base.push('anuncios',{
              data: novoAnuncio
            }).then(() =>{
                this.setState({success:true})
            }).catch(e => console.log(e))
        }
      )
    })

    e.preventDefault()
  }
  render(){
    return(
        <div>
          {this.state.success && <Redirect to='/' />}
          <HeaderInterno />
          <div className="container" style={{paddingTop:'120px'}}>
          <h1> Novo Anuncio </h1>
          <div className="col-md-12">
              <form onSubmit={this.handleSubimit} encType="multipart/form-data">
                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="foto">Foto</label>
                      <input type="file" className="form-control" id="foto"
                        placeholder="Digite aqui seu Nome"
                        ref={(ref) => this.foto = ref}/>
                    </div>

                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="nome">Nome</label>
                      <input type="text" className="form-control" id="nome"
                        placeholder="Digite aqui seu Nome"
                        ref={(ref) => this.nome = ref}/>
                    </div>

                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="categoria">Categoria</label>
                      <select id="categoria" className="form-control" ref={(ref) => this.categoria = ref}>
                        {this.props.categorias.map(cat => <option value={cat.url}>{cat.categoria}</option>)}
                      </select>
                    </div>

                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="descricao">Descrição</label>
                      <input type="text" className="form-control" id="descricao"
                        placeholder="Digite aqui sua Descrição"
                        ref={(ref) => this.descricao = ref}/>
                    </div>

                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="preco">Preco</label>
                      <input type="text" className="form-control" id="preco"
                        placeholder="Digite aqui seu Preço"
                        ref={(ref) => this.preco = ref}/>
                    </div>

                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="telefone">Telefone</label>
                      <input type="text" className="form-control" id="telefone"
                        placeholder="Digite aqui seu Telefone"
                        ref={(ref) => this.telefone = ref}/>
                    </div>

                    <div className="form-group" style={{textAlign:'left'}}>
                      <label htmlFor="vendedor">Vendedor</label>
                      <input type="text" className="form-control" id="vendedor"
                        placeholder="Digite aqui o Vendedor"
                        ref={(ref) => this.vendedor = ref}/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Salvar Anúncio
                    </button>
              </form>
          </div>
          </div>
        </div>
    )
  }
}

export default NovoAnuncio
