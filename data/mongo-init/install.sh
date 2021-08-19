echo IMPORTING COLLECTION
tar -xzvf /docker-entrypoint-initdb.d/issues.tar.gz --directory /tmp
mongoimport --authenticationDatabase=admin --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --db=farmdemo --collection=issues --file=/tmp/issues.json
echo "CLEANING UP"
rm /tmp/issues.json
echo DONE IMPORTING
