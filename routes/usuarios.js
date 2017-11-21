var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/meanUsuarios';

router.get('/creartabla', function (request, response, next) {
  mongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.createCollection('Usuarios', function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
      response.render('mensaje', {mensaje: 'La tabla se creo correctamente.'});
    });
  });
});

router.get('/alta', function (request, response, next) {
  response.render('altausuarios');
});

router.post('/guardar', function (request, response, next) {
  var registro = {
    nombre: request.body.nombre,
    apell: request.body.apell,
    email: request.body.email,
    clave: request.body.clave
  };
  mongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.collection('Usuarios').insertOne(registro, function (err, result) {
      if(err) throw err;
      db.close();
      response.render('mensaje', {mensaje: 'Registro almacenado exitosamente.'});
    });
  });
});

router.get('/verlistado', function (request, response, next) {
  mongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.collection('Usuarios').find({}).toArray(function (err, result) {
      if(err) throw err;
      db.close();
      response.render('listadousuarios', {usuarios: result});
    });
  });
});

router.get('/modificar', function (request, response, next) {
  response.render('buscausuario');
});

router.post('/actualizar', function (request, response, next) {
  mongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.collection("Usuarios").findOne({apell: request.body.apell}, function (err, result) {
      if(err) throw err;
      db.close();

      response.render('modificarusuario', {usuario: result});
    });
  });
});

router.post('/update', function (request, response, next) {
  var registro = {
    nombre: request.body.nombre,
    apell: request.body.apell,
    email: request.body.email,
    clave: request.body.clave
  };
  var key = { apell: request.body.apell };
  mongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.collection("Usuarios").updateOne(key, registro, function (err, result) {
      if(err) throw err;
      db.close();

      response.render('index');
    });
  });
});

router.get('/consultausuarios', function (request, response, next) {
  response.render('consultausuarios');
});

router.post('/consultaapell', function (request, response, next) {
  mongoClient.connect(url, function (err, db) {
    if(err) throw err;
    db.collection("Usuarios").findOne({apell: request.body.apell}, function (err, result) {
      if(err) throw err;
      db.close();

      response.render('consultausuario', {usuario: result});
    });
  });
});
module.exports = router;
