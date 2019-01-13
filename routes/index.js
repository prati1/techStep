var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
//var fs = require('fs');

const newArt = require('../models/articles');

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/uploads/')
	},
	filename: function(req,file,cb){
		cb(null,file.originalname)
	},
	filefilter: function(req,file,cb){
		if (!file.originalname.match(/(\.jpg|jpeg|png|gif|pdf)$/)){
			return cb(new Error('Only image or pdf files are allowed!'),false);
		}
	}
});
var upload = multer({
	storage: storage
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TECHSTEP' });
});

router.get('/upload-article', function(req, res, next) {
  res.render('upload-article', { title: 'Upload new article' });
});

router.get('/article-list', function(req, res, next) {
	newArt.find({},function(err,docs){
		console.log(docs,"docs testing");
		res.render('article-list',{
			title: 'Article List',
			article_list : docs
		})
	});
});

//fields([{name: 'imagePath', maxCount:1},{name:'pdf', maxCount:1}])

router.post('/article-post',upload.any(), function(req, res) {
	var data = req.body;
	var newArticle = new newArt();
	newArticle.name = data.name;
	var imagePath = req.files[0];
	newArticle.description = data.description;
	pdf = req.files[1];
	console.log('pdf',pdf);
	console.log('image',imagePath);
	newArticle.imagePath = imagePath.originalname;
	newArticle.pdf = pdf.originalname;

	newArticle.save(function(err,doc){
		if (err){
			console.log('error while saving in database');
		}
		if (!err){
			console.log('successful save to database');
		}
	});
	newArt.create(pdf,function(error,image){
		if(!error){
			console.log('pdf created');
		}
	})
	newArt.create(imagePath,function(error,image){
		if(!error){
			console.log('image created');
		}
	})
  res.redirect('/article-list');
});

module.exports = router;
