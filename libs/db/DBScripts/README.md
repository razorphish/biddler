# Running DB in Docker Container

## Automation

BIDDLER database can be scaffolded and populated via npm scripts.

```
# fresh setup
npm run db:setup 

# clean it up
npm run db:remove 

# just reset ddl/dml
npm run db:reset
```

#### Notes On Adding New SQL Scripts
When creating a new SQL script (new ddl/dml), make sure to run the `npm run db:reset` script and verify there are `NO ERRORS`.

## Manual Setup

Run these commands if you wish to see `all in action`.

```bash
docker pull mysql/mysql-server:latest
```

## Running container

## Run the below commands in the /DBScripts/ folder (MYSQL)

```bash
docker run --name biddlersql \
--mount type=bind,source=$(pwd),target=/docker-entrypoint-initdb.d \
-p 6603:3306 \
-e MYSQL_ROOT_PASSWORD=4p+db \
-d mysql/mysql-server:latest
```

## Run the below commands in the /DBScripts/ folder (POSTGRES)

```bash
docker run --name biddlerpg \
--mount type=bind,source=$(pwd),target=/docker-entrypoint-initdb.d \
-p 5432:5432 \
-e POSTGRES_PASSWORD=B1ddl3r \
-d postgres
```

## Verify Container
```bash
mysql -umysql -p4p+db -h127.0.0.1 -P6603 -e 'show global variables i.e. ';
```
##

## Stopping Container

```bash
docker stop biddlersql
```

## Starting Container

```bash
docker start biddlersql
```

## Removing Container

```bash
docker rm biddlersql
```

## RESET [All Commands]  When you just want to re-create DB in one shot

```bash
docker stop biddlersql && docker rm biddlersql && docker run --name biddlersql \
--mount type=bind,source=$(pwd),target=/docker-entrypoint-initdb.d \
-p 6603:3306 \
-e MYSQL_ROOT_PASSWORD=4p+db \
-d mysql/mysql-server:latest && docker logs --tail 5000 -f `docker ps -aqf "name=^biddlersql$"`
```

## Run the below commands in the /DBScripts/ folder

## command to check docker logs if your scripts are getting executed.

## tail is used to indicate the last specified number of logs

## Run this in the normal terminal of the MAC not in VS code

docker logs --tail 5000 -f `docker ps -aqf "name=^biddlersql$"`

## Redirecting the logs to an external file to keep a hold of the scripts

## Syntax for redirecting the logs to a different file

docker logs --tail all -f `docker ps -aqf "name=^biddlersql$"` > filename. extension

## Example of the above command

docker logs --tail all -f `docker ps -aqf "name=^biddlersql$"` > logs.txt
