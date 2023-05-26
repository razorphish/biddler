#!/bin/sh

PASSWORD="4p+db"
USER="root"
CONTAINER_NAME="whooshsql"
DB_NAME="WHOOSH_DB"

if [[ $(which docker) && $(docker --version) ]]; then
    echo "docker is installed! moving on..."

    # change dir to DBScripts
    BASEDIR=$(dirname "$0")
    cd "$BASEDIR/../libs/db/DBScripts"
    echo "Directory set to: $PWD"


    echo "stopping db container..."
    docker stop $CONTAINER_NAME;
    sleep 3;

    echo "removing db container..."
    docker rm $CONTAINER_NAME 

    echo "listing containers..."
    docker ps -a

    echo "running docker container..."
    docker run --name $CONTAINER_NAME --mount type=bind,source=$(pwd),target=/docker-entrypoint-initdb.d \
    -p 6603:3306 \
    -e MYSQL_ROOT_PASSWORD=$PASSWORD \
    -d mysql/mysql-server:latest
    
    echo "printing docker logs. Press CTRL+C to kill the script!"
    sleep 3
    docker logs --tail 5000 -f $(docker ps -aqf name="$CONTAINER_NAME")
else
    echo "Docker is not running! bye :("
fi