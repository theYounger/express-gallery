
module.exports = function (req, res, index, array) {
  switch(index) {
        case array.length - 3:
          res.render('./galleryTemplates/picpage', {
            UserId: array[index].UserId,
            UserCurr: req.user.id,
            main: array[index].link,
            mainId: req.params.id,
            author: array[index].author,
            description: array[index].description,
            createdAt: array[index].createdAt,
            updatedAt: array[index].updatedAt,
            co1: array[index + 1].link,
            co2: array[index + 2].link,
            co3: array[0].link,
            co1id: array[index + 1].id,
            co2id: array[index + 2].id,
            co3id: array[0].id
          });
          break;
        case array.length - 2:
          res.render('./galleryTemplates/picpage', {
            UserId: array[index].UserId,
            UserCurr: req.user.id,
            main: array[index].link,
            mainId: req.params.id,
            author: array[index].author,
            description: array[index].description,
            createdAt: array[index].createdAt,
            updatedAt: array[index].updatedAt,
            co1: array[index + 1].link,
            co2: array[0].link,
            co3: array[1].link,
            co1id: array[index + 1].id,
            co2id: array[0].id,
            co3id: array[1].id
          });
          break;
        case array.length - 1:
          res.render('./galleryTemplates/picpage', {
            UserId: array[index].UserId,
            UserCurr: req.user.id,
            main: array[index].link,
            mainId: req.params.id,
            author: array[index].author,
            description: array[index].description,
            createdAt: array[index].createdAt,
            updatedAt: array[index].updatedAt,
            co1: array[0].link,
            co2: array[1].link,
            co3: array[2].link,
            co1id: array[0].id,
            co2id: array[1].id,
            co3id: array[2].id
          });
          break;
        default:
          res.render('./galleryTemplates/picpage', {
            UserId: array[index].UserId,
            UserCurr: req.user.id,
            main: array[index].link,
            mainId: req.params.id,
            author: array[index].author,
            description: array[index].description,
            createdAt: array[index].createdAt,
            updatedAt: array[index].updatedAt,
            co1: array[index + 1].link,
            co2: array[index + 2].link,
            co3: array[index + 3].link,
            co1id: array[index + 1].id,
            co2id: array[index + 2].id,
            co3id: array[index + 3].id
          });
  }
};