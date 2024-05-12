const express = require('express');
const app = express();
const receitaRoutes = express.Router();

let Receita = require('../model/Receita');

// api to add receita
receitaRoutes.route('/add').post(function (req, res) {
  let receita = new Receita(req.body);
  receita.save()
  .then(receita => {
    res.status(200).json({'status': 'success','mssg': 'receita added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get receitas
receitaRoutes.route('/').get(function (req, res) {
  Receita.find(function (err, receitas){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','receitas': receitas});
    }
  });
});

// api to get receita
receitaRoutes.route('/receita/:id').get(function (req, res) {
  let id = req.params.id;
  Receita.findById(id, function (err, receita){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','receita': receita});
    }
  });
});

// api to update route
receitaRoutes.route('/update/:id').put(function (req, res) {
    Receita.findById(req.params.id, function(err, receita) {
    if (!receita){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        receita.name = req.body.name;      
        receita.descricao = req.body.descricao;    
        receita.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
receitaRoutes.route('/delete/:id').delete(function (req, res) {
  Receita.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = receitaRoutes;