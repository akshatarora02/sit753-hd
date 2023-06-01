#!/bin/bash

# Install Docker
# yum update -y
# yum install docker -y
# usermod -a -G docker ec2-user
# id ec2-user
# newgrp docker


# yum install python3-pip
# pip3 install docker-compose

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
