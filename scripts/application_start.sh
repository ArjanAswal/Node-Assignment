#!/bin/bash
# Stop all servers and start the server
cd /home/ubuntu
cp env/.env my-app1
cd /my-app1

npm run stop
npm run build
npm run pm2