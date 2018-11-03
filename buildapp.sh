#!/usr/bin/env bash
cd peddle-webapp
rm -r build
npm run build
cd ..
rm -r src/main/resources/static
cp -r peddle-webapp/build src/main/resources/static
mvn clean install
cp -f target/peddle-1.0-SNAPSHOT.jar eventtour.jar