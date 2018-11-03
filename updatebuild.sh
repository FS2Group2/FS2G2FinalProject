#!/usr/bin/env bash
sudo systemctl stop my-webapp
git pull https://github.com/FS2Group2/peddle.git
sudo ./buildapp.sh
sudo systemctl start my-webapp