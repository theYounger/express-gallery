const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');

const db = require('../models');

const fakeDB = require('../db/galleryModel');

Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json());

/*function addItem(req, res) {
   db.query("insert into products(name, price, inventory) values($1, $2, $3)", [req.body.name, req.body.price, req.body.inventory])
    .then(console.log)
    .catch(console.log);
  }*/

Router.route('/')
/* to view a list of gallery photos */
  .get( ( req, res ) => {
  db.Gallery.findAll({
    attributes: ['link']
    })
    .then(function(gallery){
      res.render('./gallerytemplates/index', {
        photos: gallery
      });
    })
    .catch( (err) => {
      console.log('ERR', err);
    });
  })

/* to create a new gallery photo */
  .post( ( req, res ) => {
    db.Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    });
    res.send({success: true});
  });

Router.route('/:id')
/*  to see a single gallery photo */
  .get( (req, res) => {
    db.Gallery.findAll(
    {where: {id: req.params.id}})
    .then(function(image){
      console.log('image', image);
      res.render('./gallerytemplates/picpage', {
        photos: image[0].dataValues.link
      });
    })
    .catch( (err) => {
      console.log('ERR', err);
    });
  })

/*  updates a single gallery photo identified by the :id param */
  .put( ( req, res ) => {
    res.send('hi gallery/:id put');
  })
/* to delete a single gallery photo identified by the :id param */
  .delete ( ( req, res ) => {
    db.Gallery.destroy(
      {where: {id: req.params.id}})
      .then(function(gallery){
        res.render('./gallerytemplates/index', {
          photos: gallery
        });
      })
      .catch( (err) => {
        console.log('ERR', err);
      });
    });

/*  to see a "new photo" form */
Router.get( '/new', ( req, res ) => {
  res.send('hi gallery/new get');
});

/*  to see a form to edit a gallery photo identified by the :id param */
Router.get( '/:id/edit', ( req, res ) => {
  res.send('hi gallery/:id/edit get');
});

module.exports = Router;