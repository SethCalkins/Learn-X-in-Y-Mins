# Reference Docs

An augmented clone of [Learn X In Y Minutes][learn]. Live site at <http://reference.isinn.co>.

## Why?

I wanted to add specific notes to the reference docs found on LXIYM, but most of my additions are probably to specific to warrant making a pull request. As such, this is basically my own private version. Feel free to use it :grinning:. Or if you want to host your own reference then fork away.

## What's Included

This repository contains the code for the live site found at <http://reference.isinn.co>, but all documentation is contained in a submodule. In my case, I forked the [learn x in y minutes docs][repo] so that I could maintain my own copy with edits and notes.

The main content is intentionally decoupled from the web app. This allows easy updating of the documentation code, either by merging in the latest changes from the official repo or by creating new content of your own.

[learn]: http://learnxinyminutes.com
[repo]: https://github.com/adambard/learnxinyminutes-docs

## Development

To start developing, simply clone the repo and run:

```
$ npm install
$ gulp
```

The `gulp deps` task will copy over most dependencies. The mfizz font is no acception but since it wasn't on NPM I needed to put it's source elsewhere. It's source CSS resides in `/stylesheets/font-mfizz.css`. The CSS was modified slightly to provide a different font path from the default. The font files were just copied directly into `/public/fonts`. As such they are checked into the project, so cloning should not be a problem.

Octicons are also included manually as they are not present on NPM. They exist on bower, but using two package managers just seems silly. The fonts were added manually to the `/public/fonts` directory. CSS resides in `/stylesheets/octicons.css` and is concatenated and minified along with other CSS dependencies.
