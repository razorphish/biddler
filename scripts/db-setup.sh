#!/bin/sh

#####################################################################################
# Script to scaffold and populate BiddlerSQL database in a docker container
#####################################################################################
PASSWORD="4p+db"
USER="root"
CONTAINER_NAME="biddlersql"
DB_NAME="BIDDLER_DB"

if [[ $(which docker) && $(docker --version) ]]; then
    echo "docker is installed! moving on..."

    # change dir to DBScripts
    BASEDIR=$(dirname "$0")
    cd "$BASEDIR/../libs/db/DBScripts"
    echo "Directory set to: $PWD"

    # pull container
    echo "pulling mysql container..."
    docker pull mysql/mysql-server:latest

    # run container 
    echo "starting mysql container..."
    docker run --name $CONTAINER_NAME \
                --mount type=bind,source=$(pwd),target=/docker-entrypoint-initdb.d \
                -p 3326:3306 \
                -e MYSQL_ROOT_HOST=% \
                -e MYSQL_ROOT_PASSWORD=$PASSWORD \
                -d mysql/mysql-server:latest
    sleep 3;
    echo "checking container status..."

    result=$(docker inspect -f "{{.State.Running}}" "$CONTAINER_NAME")

    if [[ -z "$result" ]]; then 
        echo "Docker run failed for biddlersql! bye :("
        exit 1;
    else
        sleep 5;
        echo "Verifying data..."
        result=$(docker exec -i $CONTAINER_NAME mysql -u$USER -p$PASSWORD  <<< "select * FROM BIDDLER_DB.ROLE_TYPE;")

        if [[ "$result" == *"ROLE_TYPE_CD"* ]]; then 
            echo "\n** Validation Result:** \n$result"
            echo "Woohoo! Database is populated and setup is complete now! Enjoy :)"
        else 
            echo "Error querying data! Database setup may have failed! bye :("
            exit 1;
        fi                
    fi
else
    echo "Docker is not running! bye :("
fi