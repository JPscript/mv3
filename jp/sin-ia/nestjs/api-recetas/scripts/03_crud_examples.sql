\set ON_ERROR_STOP on
\encoding UTF8
SET client_encoding = 'UTF8';

SELECT id, nombre, descripcion, latitud, longitud
FROM public.restaurants
ORDER BY id ASC;

SELECT r.id, r.nombre, COUNT(rec.id) AS total_recetas
FROM public.restaurants r
LEFT JOIN public.recipes rec ON rec.restaurant_id = r.id
GROUP BY r.id, r.nombre
ORDER BY r.id ASC;

SELECT r.id, r.nombre,
	   ROUND(AVG(rt.calificacion)::numeric, 2) AS rating_promedio,
	   COUNT(rt.id) AS total_valoraciones
FROM public.restaurants r
LEFT JOIN public.ratings rt ON rt.restaurant_id = r.id
GROUP BY r.id, r.nombre
ORDER BY r.id ASC;

INSERT INTO public.comments (restaurant_id, user_id, comentario)
VALUES (1, 4, 'Comentario de prueba desde script SQL.');

UPDATE public.restaurants
SET descripcion = 'Descripcion actualizada desde script SQL.'
WHERE id = 2;

DELETE FROM public.comments
WHERE comentario = 'Comentario de prueba desde script SQL.';
