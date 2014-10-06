var express          = require('express');
var fs               = require('fs');
var _                = require('lodash');
var marked           = require('marked');
var parseFrontMatter = require('yaml-front-matter').loadFront;

var router  = express.Router();

// Synchronous code highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  var languages = _.remove(fs.readdirSync('./docs'), function(item) {
    return item.match(/\.html\.markdown/);
  });

  languages = languages.map(function(item) {
    return item.slice(0, item.indexOf('.'));
  });

  res.render('index', {
    languages: languages
  });
});

router.get('/:lang', function(req, res) {
  var lang = req.params.lang;
  var markdown,
      markdownFile;

  try {
    markdown = fs.readFileSync('./docs/' + lang + '.html.markdown');
  } catch (err) {
    return res.render('error', {
      message: "No reference found for " + lang,
      error: {}
    });
  }

  markdownFile = parseFrontMatter(markdown);

  res.render('doc', {
    title: lang,
    bodyHTML: marked(markdownFile.__content)
  });
});

module.exports = router;
