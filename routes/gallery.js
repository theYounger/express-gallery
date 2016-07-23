const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const db = require('../models');

/*==========================
==========MIDDLEWARE========*/
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json());
Router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
/*==========================*/


/*----------  ROUTES  ----------*/

Router.route('/')
/* to view a list of gallery photos */
  .get( ( req, res ) => {
  db.Gallery.findAll({
    attributes: ['link']
    })
    .then(function(gallery){
      res.render('./galleryTemplates/index', {
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

Router.get( '/new', ( req, res ) => {
  res.render('./galleryTemplates/new');
});

Router.route('/:id')
/*  to see a single gallery photo */
  .get( (req, res) => {
    db.Gallery.findAll(
    {where: {id: req.params.id}})
    .then(function(image){
      console.log('image', image);
      res.render('./galleryTemplates/picpage', {
        photos: image[0].dataValues.link,
        photoId: req.params.id
      });
    })
    .catch( (err) => {
      console.log('ERR', err);
    });
  })

/*  updates a single gallery photo identified by the :id param */
  .put( ( req, res ) => {
    let selectRow = {};
    db.Gallery.findAll({where: {id: req.params.id}})
      .then (() => {
        for (var key in req.body) {
          selectRow[key] = req.body[key];
        }
        db.Gallery.update(selectRow, {where: { id: req.params.id }})
          .then(function (result) {
          })
          .catch((err) => {
            console.log(err);
          });
      });
  })
/* to delete a single gallery photo identified by the :id param */
  .delete ( ( req, res ) => {
    db.Gallery.destroy({where: {id: req.params.id}})
      .then(function(gallery){
        res.render('./galleryTemplates/index', {
          photos: gallery
        });
      })
      .catch( (err) => {
        console.log('ERR', err);
      });
    });

/*  to see a "new photo" form */

/*  to see a form to edit a gallery photo identified by the :id param */
Router.get( '/:id/edit', ( req, res ) => {
  db.Gallery.findAll(
    {where: {id: req.params.id}})
    .then(function(image){
      console.log('image', image);
      res.render('./galleryTemplates/edit', {
        photoId: image[0].dataValues.id,
        photoLink: image[0].dataValues.link
      });
    })
    .catch( (err) => {
      console.log('ERR', err);
    });
});

module.exports = Router;