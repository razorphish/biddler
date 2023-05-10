#!/bin/sh

#####################################################################################
# Script to clean up database setup. Removes database container and images
#####################################################################################
docker stop hptsql 
docker rm hptsql 
docker rmi mysql/mysql-server 

echo "\nprinting containers..."
docker ps -a 

echo "\nprinting docker images..."
docker images 

echo "Database removed successfully! bye :)"

