
module.exports = function (req, res, index, array) {
  switch(index) {
        case array.length - 3:
          res.render('./galleryTemplates/picpage', {
            main: array[index].link,
            mainId: req.params.id,
            co1: array[index + 1].link,
            co2: array[index + 2].link,
            co3: array[0].link
          });
          break;
        case array.length - 2:
          res.render('./galleryTemplates/picpage', {
            main: array[index].link,
            mainId: req.params.id,
            co1: array[index + 1].link,
            co2: array[0].link,
            co3: array[1].link
          });
          break;
        case array.length - 1:
          res.render('./galleryTemplates/picpage', {
            main: array[index].link,
            mainId: req.params.id,
            co1: array[0].link,
            co2: array[1].link,
            co3: array[2].link
          });
          break;
        default:
          res.render('./galleryTemplates/picpage', {
            main: array[index].link,
            mainId: req.params.id,
            co1: array[index + 1].link,
            co2: array[index + 2].link,
            co3: array[index + 3].link
          });
  }
};