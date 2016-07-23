module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define("Gallery", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
/*      associate: function(models) {
        Gallery.belongsTo(models.User);
      }*/
        // getDataValues: (data) => {
        //     return (imaging) => {
        //       const imgVal = imaging[0].dataValues;
        //       res.render('./galleryTemplates/edit', {
        //         photoId: req.params.id,
        //         photoAuthor: imgVal.author,
        //         photoLink: imgVal.link,
        //         photoDesc: imgVal.description
        //       });
        //     };
    }
  });
  return Gallery;
};