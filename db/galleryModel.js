function galleryModel() {

  const memory = [];

  function _addItem(item) {
    memory.push(item);
  }

  function _editArti(req) {
    memory.forEach(function(ele) {
      if(ele.title == req.params.title) {
        for (var key in ele) {
          ele[key] = req.body[key];
        }
      }
    });
  }

  function _deleteArti(req) {
    memory.forEach(function(ele, indie, arrie) {
      if(ele.title == req.params.title) {
        arrie.splice(indie, 1);
      }
    });
  }

  function _getIdItem(req) {
    return memory.filter(function(ele) {
      return ele.title == req.params.title;
    });
  }

  return {
    getAll: () => {
      return memory;
    },
    addItem: _addItem,
    editArti: _editArti,
    deleteArti: _deleteArti,
    getIdItem: _getIdItem
  };

}

module.exports = galleryModel();