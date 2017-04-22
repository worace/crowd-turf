create extension postgis;
create extension "uuid-ossp";

create table canvases(
id uuid,
name varchar,
user_id uuid
);

create table turf(
id uuid,
canvas_id uuid,
geog geography
);

create table users(
id uuid,
first_name varchar,
last_name varchar,
email varchar,
password_digest varchar,
salt varchar
);

CREATE INDEX idx_turf_geog
ON turf
USING GIST(geog);

CREATE INDEX idx_users_id
ON users
USING BTREE(id);

CREATE INDEX idx_turf_id
ON turf
USING BTREE(id);

CREATE INDEX idx_turf_canvas_id
ON turf
USING BTREE(canvas_id);

CREATE INDEX idx_canvas_id
ON canvases
USING BTREE(id);

CREATE INDEX idx_canvas_user_id
ON canvases
USING BTREE(user_id);
