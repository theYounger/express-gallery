'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Galleries', [{
      author : 'Cow',
      link : 'http://www.liveanimalslist.com/mammals/images/cow-looking-with-surprise.jpg',
      description : 'Here\'s the first pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Pig',
      link : 'http://www.shauntmax30.com/data/out/33/1221079-amazing-pig-wallpaper.png',
      description : 'Here\'s the second pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Cat',
      link : 'http://www.taddit.com/images/2012-12-23/most-amazing-photos-ever41.jpg',
      description : 'Here\'s the third pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'lulz',
      link : 'http://www.funn4u.com/wp-content/uploads/2015/05/Funny-And-Amazing-Creativity.jpg',
      description : 'Here\'s the fourth pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Pug',
      link : 'http://science-all.com/images/wallpapers/amazing-pic/amazing-pic-16.jpg',
      description : 'Here\'s the fifth pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Nice',
      link : 'https://upload.wikimedia.org/wikipedia/commons/6/63/Nice-seafront.jpg',
      description : 'Here\'s the sixth pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Wavez',
      link : 'http://webneel.com/daily/sites/default/files/images/daily/09-2013/17-most-amazing-photo-hight-sea-tide.jpg',
      description : 'Here\'s the seventh pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      author : 'Scenic',
      link : 'http://science-all.com/images/wallpapers/amazing-pic/amazing-pic-25.jpg',
      description : 'Here\'s the eighth pic of the gallery',
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Galleries', [{
      author :'Cow'
    }, {
      author :'Pig'
    }, {
      author :'Cat'
    }, {
      author : 'lulz'
    }, {
      author : 'Pug'
    }, {
      author : 'Nice'
    }, {
      author : 'Wavez'
    }, {
      author : 'Scenic'
    }
    ]);
  }
};