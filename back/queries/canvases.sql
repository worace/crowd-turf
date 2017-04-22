-- name: all_users
SELECT *
FROM users

-- name: user_by_id
SELECT *
FROM users
WHERE id = :id
