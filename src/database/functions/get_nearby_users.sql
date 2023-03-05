CREATE OR REPLACE FUNCTION public.get_nearby_users(lat double precision, long double precision, radius double precision)
 RETURNS SETOF nearby_users 
 LANGUAGE sql STABLE AS
$function$
SELECT id, first_name, last_name, gender, ST_X(location::geometry) AS lat, ST_Y(location::geometry) AS long
FROM "location" AS b
INNER JOIN "user" ON "user"."id" = "b"."user_id"
WHERE ST_DWITHIN(location, ST_BUFFER(ST_SetSRID(st_point(lat, long),4326), 3857), radius*1000);
$function$