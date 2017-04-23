-- name: all_users
SELECT *
FROM users;

-- name: user_by_id
SELECT *
FROM users
WHERE id = :id;

-- name: all_canvases
SELECT *
FROM canvases;

-- name: turf_for_canvas
SELECT *
FROM turf
WHERE canvas_id = :canvas_id;

