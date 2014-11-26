var express          = require('express');
var marked           = require('marked');
var parseFrontMatter = require('yaml-front-matter').loadFront;
var fs               = require('fs');
var _                = require('lodash');

var router  = express.Router();

// Synchronous code highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

/**
 * Return an object containing both featured langauges and all other languages
 * (rest).
 * @return { function }
 */
var languages = (function() {

  var featuredLanguages = [
    'javascript',
    'ruby',
    'php',
    'python',
    'bash',
    'markdown'
  ];

  // Match markdown files that use the .html.markdown extension.
  function matchMarkdown(filename) {
    return filename.match(/\.html\.markdown/);
  }

  // Return the name of a file, sans extension
  function removeExtension(filename) {
    return filename.slice(0, filename.indexOf('.'));
  }

  // Return languages that are not within featuredLanguages
  function notFeaturedLanguage(filename) {
    return !_.contains(featuredLanguages, filename)
  }

  var rest = _(fs.readdirSync('./docs'))
                      .filter(matchMarkdown)
                      .map(removeExtension)
                      // .filter(notFeaturedLanguage)
                      .value();

  return {
    featured: featuredLanguages,
    rest: rest
  };
})();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', languages);
});

router.get('/:lang', function(req, res) {
  var lang = req.params.lang,
      markdownFile,
      markdown;

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
