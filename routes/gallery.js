const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const previewFix = require('../lib/img_preview_fix');

const db = require('../models');

const Router = express.Router();
const Gallery = db.Gallery;
let method;

/*= ========================
==========MIDDLEWARE========*/
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
/*= =========================*/

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
};

/*  -------- ROUTES ---------*/
Router.route('/')
/* to view a list of gallery photos */
  .get(isAuthenticated, (req, res) => {
    Gallery.findAll({
      attributes: ['id', 'author', 'link'],
    })
    .then((gallery) => {
      res.json(gallery);
    })
    .then((gallery) => {
      res.render('./galleryTemplates/index', {
        photos: gallery,
      });
    });
  })
/* to create a new gallery photo */
  .post(isAuthenticated, (req, res) => {
    Gallery.create({
      UserId: req.user.id,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description,
    }).then(() => {
      res.redirect('/gallery');
    });
  });

Router.get('/page/:page', isAuthenticated, (req, res) => {
  Gallery.findAll({
    offset: req.params.page * 3,
    limit: 3,
    attributes: ['id', 'author', 'link'],
  })
  .then((gallery) => {
    res.render('./galleryTemplates/index', {
      photos: gallery,
    });
  });
});

/*  to see a "new photo" form */
Router.get('/new', isAuthenticated, (req, res) => {
  res.render('./galleryTemplates/new');
});

Router.route('/:id')
/*  to see a single gallery photo */
.get(isAuthenticated, (req, res) => {
  Gallery.findAll({
    attributes: ['UserId', 'id', 'author', 'link', 'description', 'createdAt', 'updatedAt'],
  })
  .then((image) => {
    const imageMap = image.map((element) => {
      return {
        UserId: element.dataValues.UserId,
        link: element.dataValues.link,
        id: element.dataValues.id,
        author: element.dataValues.author,
        description: element.dataValues.description,
        createdAt: element.dataValues.createdAt,
        updatedAt: element.dataValues.updatedAt,
      };
    });
    let mainIndex;
    imageMap.forEach((ele, ind) => {
      if (ele.id === req.params.id) {
        mainIndex = ind;
      }
    });
    previewFix(req, res, mainIndex, imageMap);
  });
})
/*  updates a single gallery photo identified by the :id param */
  .put(isAuthenticated, (req, res) => {
    const selectRow = {};
    Gallery.findAll({ where: { id: req.params.id } })
      .then(() => {
        for(let key in req.body) {
          selectRow[key] = req.body[key];
        }
        Gallery.update(selectRow, { where: { id: req.params.id } })
          .then((result) => {
          });
      }).then(() => {
        res.redirect(`/gallery/${req.params.id}`);
      });
  })
/* to delete a single gallery photo identified by the :id param */
  .delete(isAuthenticated, (req, res) => {
    Gallery.destroy({ where: { id: req.params.id } })
      .then((gallery) => {
        res.render('./galleryTemplates/index', {
          photos: gallery,
        });
      });
  });

/*  to see a form to edit a gallery photo identified by the :id param */
Router.get('/:id/edit', isAuthenticated, (req, res) => {
  Gallery.findAll(
    { where: { id: req.params.id } })
    .then((image) => {
      const imgData = image[0].dataValues;
      res.render('./galleryTemplates/edit', {
        photoId: imgData.id,
        photoLink: imgData.link,
      });
    });
});

module.exports = Router;
