var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleCol = new Schema({
	name: {type: String, required: true},
    imagePath: {type: String, required: true},
    description: {type: String, required: true},
    pdf: {type: String, require: true}
});

module.exports = mongoose.model('Article', articleCol);