const config = {
    apiKey: "AIzaSyCEFB_qOcKM3Q8SOo-Xa65eJLCr6ZiCCt0",
    authDomain: "mercadodev-ba418.firebaseapp.com",
    databaseURL: "https://mercadodev-ba418.firebaseio.com",
    projectId: "mercadodev-ba418",
    storageBucket: "mercadodev-ba418.appspot.com",
    messagingSenderId: "596245059618"
  }


  const Rebase =  require('re-base')
  const firebase = require('firebase/app')
  require('firebase/database')

  const app = firebase.initializeApp(config)
  const base = Rebase.createClass(app.database())

  export default base
