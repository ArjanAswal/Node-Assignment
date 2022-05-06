#!/bin/bash
cd /home/ubuntu
sudo cp env/.env my-app1
cd my-app1

# Stop all servers and start the server
sudo npm run stop
sudo npm run build
sudo npm run pm2