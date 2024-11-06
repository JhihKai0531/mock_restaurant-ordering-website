#!/usr/bin/env sh

# 當發生錯誤時終止
set -e

# 建構
npm run build

# cd 到建構輸出的目錄下
cd dist

# 如果要部署到自定義域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:JhihKai0531/mock_restaurant-ordering-website.git master:gh-pages

cd -