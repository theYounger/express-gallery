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
    }
  });

  return Gallery;
};