#!/bin/bash
# Stop all servers and start the server
cd /home/ubuntu/my-app1/

npm run stop
npm run build
npm run pm2