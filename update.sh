#!/bin/bash
#
# Working on an outomated solution to update the docs via rebasing upstream then
# pusshing upt to origin.
cd ./docs
git fetch upstream
git rebase upstream/master
git push origin master

cd ..
git add docs/
