#!/bin/sh
echo "====== Begin webapp entrypoint.sh ======"
#sh scripts/wait-for -t 10 0.0.0.0:5432 -- echo "POSTGRES is up"
npm install -g nodemon
npm install --no-bin-links --no-optional
npm start
#cat /root/.npm/_logs/2018-01-18T00_40_16_380Z-debug.log
