const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Receita = new Schema({
  name: {     /// adicionar
    type: String
  },
  descricao: {
    type: String
  }
},{
    collection: 'receita'
});

module.exports = mongoose.model('Receita', User);