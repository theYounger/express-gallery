module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Gallery.belongsTo(models.User);
      },
    },
  });
  return Gallery;
};
