#!/bin/bash -e

git branch -f master
git checkout master
git reset --hard origin/develop
npm run build

git add -A .
git commit -a -m "deploy"
git push origin master --force
git checkout develop
git rev-parse --abbrev-ref HEAD
