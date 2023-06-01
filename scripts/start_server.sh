#!/bin/bash

##remove previously running containers
docker-compose -f /var/www/html/myapp/docker-compose.yml down --remove-orphans

docker-compose -f /var/www/html/myapp/docker-compose.yml up -d