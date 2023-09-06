// exporta f.teste, chamada em /routes/index
exports.index = function (req, res) {
  res.render("welcome");
};
// página 'create'
exports.create = function (req, res) {
  res.render("createBook");
};
