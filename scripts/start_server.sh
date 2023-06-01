#!/bin/bash

##remove previously running containers
docker-compose down -f /var/www/html/myapp/docker-compose.yml --remove-orphans

docker-compose -f /var/www/html/myapp/docker-compose.yml up -d