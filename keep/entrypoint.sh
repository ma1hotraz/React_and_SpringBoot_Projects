#!/bin/bash

# Sleep to allow time for MySQL to start
sleep 10

# Additional MySQL commands if needed
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'root'@'%' IDENTIFIED BY 'password';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE notes_db;"


# Keep the container running
exec "$@"
