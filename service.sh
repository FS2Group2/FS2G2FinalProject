#!/usr/bin/env bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 9000
java -jar eventtour.jar
