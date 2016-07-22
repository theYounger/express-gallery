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
    res.render('./gallerytemplates/index', {
      photos: fakeDB.getAll()
    });
    /*res.send('hi gallery get');*/
  })
/* to create a new gallery photo */
  .post( ( req, res ) => {
    fakeDB.addItem(req.body);
    console.log('req ', req);
    console.log('req.body ', req.body);
    res.send({success: true});
    console.log(fakeDB.getAll());
  });

Router.route('/:id')
/*  to see a single gallery photo */
  .get( (req, res) => {
    res.send('hi gallery/:id get');
  })
/*  updates a single gallery photo identified by the :id param */
  .put( ( req, res ) => {
    res.send('hi gallery/:id put');
  })
/* to delete a single gallery photo identified by the :id param */
  .delete ( ( req, res ) => {
    db.post.destroy({
      where : {
        id : req.params.id
      }
    })
    .then(function(){
      // then redirect to gallery
      res.redirect('/gallery');
    });
    // res.send('hi gallery/:id delete');
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