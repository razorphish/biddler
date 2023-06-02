#!/bin/sh

#####################################################################################
# Script to clean up database setup. Removes database container and images
#####################################################################################
docker stop biddlersql 
docker rm biddlersql 
docker rmi mysql/mysql-server 

echo "\nprinting containers..."
docker ps -a 

echo "\nprinting docker images..."
docker images 

echo "Database removed successfully! bye :)"

