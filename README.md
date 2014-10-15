# Reference Docs

An augmented clone of [Learn X In Y Minutes][learn]. Live site at <http://reference.isinn.co>.

## Why?

I wanted to add specific notes to the reference docs found on LXIYM, but most of my additions are probably to specific to warrant making a pull request. As such, this is basically my own private version. Feel free to use it :grinning:. Or if you want to host your own reference then fork away.

## What's Included

This repository contains the code for the live site found at <http://reference.isinn.co>, but all documentation is contained in a submodule. In my case, I forked the [learn x in y minutes docs][repo] so that I could maintain my own copy with edits and notes.

The main content is intentionally decoupled from the web app. This allows easy updating of the documentation code, either by merging in the latest changes from the official repo or by creating new content of your own.

[learn]: http://learnxinyminutes.com
[repo]: https://github.com/adambard/learnxinyminutes-docs

## TODO

#### 2014-10-07

Looks like the remote server is having trouble cloning the submodule (`/docs`) using the `git@` form of remote. This would make sense since my GitHub public key is not the normal one I have on all my droplets. I have two options:

* Add the key to the server
* Add the server key to GitHub

The latter may be the better option because it will save me time down the road and ensure all my servers have read/write access to GitHub.
