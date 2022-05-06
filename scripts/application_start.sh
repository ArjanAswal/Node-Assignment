#!/bin/bash
cd /home/ubuntu
sudo cp env/.env my-app1
cd my-app1

# Stop all servers and start the server
npm run stop
npm run build
npm run pm2