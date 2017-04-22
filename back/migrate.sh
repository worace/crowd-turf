#! /bin/bash

export PGPASSWORD=$DB_PASS

if [ "$CREATEDB" -eq "1" ]; then
    dropdb --if-exists --host=$DB_HOST --username=$DB_USER --port=$DB_PORT $DB_NAME
    createdb --host=$DB_HOST --username=$DB_USER --port=$DB_PORT $DB_NAME
fi

psql -d $DB_NAME \
     -h $DB_HOST \
     -U $DB_USER \
     -p $DB_PORT \
     -f ./schema.sql
