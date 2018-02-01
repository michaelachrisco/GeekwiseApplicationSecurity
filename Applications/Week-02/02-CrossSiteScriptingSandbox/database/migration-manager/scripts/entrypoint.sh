#!/bin/sh
echo "====== Begin CrossSiteScripting enrypoint.sh ======"
#sh scripts/new-wait-for.sh 0.0.0.0:5432 -- echo "POSTGRES is up"
sh "sleep 5;nc -lk 0.0.0.0 5432;"
npm install -g nodemon
npm install --no-bin-links --no-optional
npm start
#cat /root/.npm/_logs/2018-01-18T00_40_16_380Z-debug.log
