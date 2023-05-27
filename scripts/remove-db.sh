#!/bin/sh

#####################################################################################
# Script to clean up database setup. Removes database container and images
#####################################################################################
docker stop whooshsql 
docker rm whooshsql 
docker rmi mysql/mysql-server 

echo "\nprinting containers..."
docker ps -a 

echo "\nprinting docker images..."
docker images 

echo "Database removed successfully! bye :)"

