#!/usr/bin/env bash
java -jar eventtour.jar
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 9000
