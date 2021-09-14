SET @user_latitude = ?,
    @user_longitude = ?,
    @radius = ?,
    --NAME @name = ?
    ;
SELECT (
    bar_id AS id,
    name,
    description,
    address,
    website,
    latitude,
    longitude,
    (
        SELECT
            COUNT(ratings) as num_of_ratings,
            AVG(ratings) as avg_rating
        FROM Reviews
        WHERE bar_id = id
        GROUP BY bar_id
    ) AS ratings,
    (
        111.111 *
        DEGREES(ACOS(LEAST(1.0, COS(RADIANS(@user_latitude))
            * COS(RADIANS(latutude))
            * COS(RADIANS(@user_longitude - longitude))
            + SIN(RADIANS(@user_latitude))
            * SIN(RADIANS(latitude)))))
    ) AS distance_in_km
)

FROM Bars
--NAME AND NAME LIKE CONCAT('%', @name, '%')
AND distance_in_km <= @radius;