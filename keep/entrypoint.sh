#!/bin/bash

# Sleep to allow time for MySQL to start
sleep 10

# Additional MySQL commands if needed
<<<<<<< HEAD
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'user'@'%' IDENTIFIED BY 'user';"
=======
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'root'@'%' IDENTIFIED BY 'password';"
>>>>>>> 8ab491454969d2041676a36fd66b635fe493226c
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE notes_db;"


# Keep the container running
<<<<<<< HEAD
exec "$@"
=======
exec "$@"
>>>>>>> 8ab491454969d2041676a36fd66b635fe493226c
