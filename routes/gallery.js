const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const db = require('../models');

/*==========================
==========MIDDLEWARE========*/
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
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
    console.log(req);
  db.Gallery.findAll({
    attributes: ['id', 'author', 'link', 'description', 'createdAt', 'updatedAt']
    })
    .then(function(gallery){
      res.render('./galleryTemplates/index', {
        photos: gallery,
        /*photoId: req.params.id*/
      });
    });
  })

/* to create a new gallery photo */
  .post( ( req, res ) => {
    db.Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    });
  });

/*  to see a "new photo" form */
Router.get( '/new', ( req, res ) => {
  res.render('./galleryTemplates/new');
});

Router.route('/:id')
/*  to see a single gallery photo */
.get( (req, res) => {
  db.Gallery.findAll(
    {where:
    {
      id: {
        $between: [req.params.id - 2, req.params.id + 1]
      }
    }
  })
  .then(function(image){
    const imageMap = image.map((element) => {
      return element.dataValues.link;
    });
    console.log('imageMap', imageMap);
    res.render('./galleryTemplates/picpage', {
      main: imageMap[2],
      mainId: req.params.id,
      co1: imageMap[0],
      co2: imageMap[1],
      co3: imageMap[3]
    });
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
      });
    });

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
    });
});

module.exports = Router;