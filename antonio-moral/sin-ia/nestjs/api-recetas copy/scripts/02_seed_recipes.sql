TRUNCATE TABLE public.ratings, public.comments, public.recipes, public.restaurants, public.users RESTART IDENTITY CASCADE;

-- Todos los usuarios seed usan la misma clave de clase: seniorcat123
INSERT INTO public.users (nombre, image_url, password_hash)
VALUES
('Senior Cat', 'http://localhost:3000/files/user-senior-cat.jpg', '$2b$10$OMRTuwKDFDaWcXBJqAawS.hkH16TtQ/B6A73e/C0apNSOe0XRVYGK'),
('Luna Dev', 'http://localhost:3000/files/user-luna-dev.jpg', '$2b$10$OMRTuwKDFDaWcXBJqAawS.hkH16TtQ/B6A73e/C0apNSOe0XRVYGK'),
('Mateo Front', 'http://localhost:3000/files/user-mateo-front.jpg', '$2b$10$OMRTuwKDFDaWcXBJqAawS.hkH16TtQ/B6A73e/C0apNSOe0XRVYGK'),
('Valeria Maps', 'http://localhost:3000/files/user-valeria-maps.jpg', '$2b$10$OMRTuwKDFDaWcXBJqAawS.hkH16TtQ/B6A73e/C0apNSOe0XRVYGK'),
('Nico Comentarios', 'http://localhost:3000/files/user-nico-comentarios.jpg', '$2b$10$OMRTuwKDFDaWcXBJqAawS.hkH16TtQ/B6A73e/C0apNSOe0XRVYGK');

INSERT INTO public.restaurants (nombre, descripcion, fotografia_url, latitud, longitud)
VALUES
('La Esquina de Senior Cat', 'Cocina casera con brunch, tostadas y platos de temporada en un espacio tranquilo para estudiar y programar.', 'http://localhost:3000/files/restaurant-senior-cat.jpg', 40.416775, -3.703790),
('Bistró Ladrillos', 'Restaurante urbano con menú mediterráneo, pastas frescas y recetas pensadas para compartir.', 'http://localhost:3000/files/restaurant-bistro-ladrillos.jpg', 41.387397, 2.168568),
('Mapa y Mesa', 'Local moderno especializado en bowls, ensaladas y platos ligeros cerca del centro.', 'http://localhost:3000/files/restaurant-mapa-y-mesa.jpg', 39.469907, -0.376288),
('Puerto Sabor', 'Restaurante costero con pescado, arroces y cocina de mercado con producto fresco.', 'http://localhost:3000/files/restaurant-puerto-sabor.jpg', 36.721273, -4.421399);

INSERT INTO public.recipes (restaurant_id, nombre, descripcion, ingredientes, tiempo_min, dificultad, image_url)
VALUES
(1, 'Tostada Senior Cat', 'Pan de masa madre con aguacate, tomate rallado y limón, ideal para desayunos largos.', 'pan de masa madre,aguacate,tomate,limon,aceite,sal', 10, 'facil', 'http://localhost:3000/files/recipe-tostada-senior-cat.jpg'),
(1, 'Huevos del Mentor', 'Huevos revueltos cremosos con cebollino y pan tostado.', 'huevos,mantequilla,cebollino,pan,sal,pimienta', 12, 'facil', 'http://localhost:3000/files/recipe-huevos-mentor.jpg'),
(2, 'Pasta Ladrillos', 'Pasta corta con salsa de tomate, ajo y albahaca fresca.', 'pasta,tomate,ajo,albahaca,aceite,parmesano', 20, 'media', 'http://localhost:3000/files/recipe-pasta-ladrillos.jpg'),
(2, 'Lasagna de Obra', 'Lasaña de ternera y verduras asadas con bechamel ligera.', 'placas de lasana,ternera,zanahoria,cebolla,tomate,bechamel,queso', 50, 'dificil', 'http://localhost:3000/files/recipe-lasagna-obra.jpg'),
(3, 'Ensalada Arcoiris', 'Bol de vegetales frescos, quinoa y vinagreta cítrica.', 'quinoa,lechuga,tomate,zanahoria,pepino,cebolla morada,limon,aceite', 15, 'facil', 'http://localhost:3000/files/recipe-ensalada-arcoiris.jpg'),
(3, 'Bowl de Garbanzos', 'Bowl templado con garbanzos, boniato asado y yogur especiado.', 'garbanzos,boniato,yogur,comino,pimenton,espinaca', 25, 'media', 'http://localhost:3000/files/recipe-bowl-garbanzos.jpg'),
(4, 'Arroz del Puerto', 'Arroz meloso con marisco y caldo concentrado de pescado.', 'arroz,caldo de pescado,gambas,mejillones,calamar,ajo,pimenton', 40, 'dificil', 'http://localhost:3000/files/recipe-arroz-puerto.jpg'),
(4, 'Lubina al Horno', 'Lubina con patata panadera, limón y hierbas frescas.', 'lubina,patata,limon,ajo,perejil,aceite,sal', 35, 'media', 'http://localhost:3000/files/recipe-lubina-horno.jpg');

INSERT INTO public.comments (restaurant_id, user_id, comentario)
VALUES
(1, 2, 'El brunch es muy bueno y la tostada de aguacate sale siempre perfecta.'),
(1, 3, 'Buen sitio para desayunar antes de clase. El cafe tambien merece la pena.'),
(2, 1, 'La pasta estaba al dente y la atencion fue muy cercana.'),
(2, 5, 'Volveria por la lasagna, se nota que esta hecha con tiempo.'),
(3, 4, 'Ideal para comer ligero y seguir trabajando sin quedarte pesado.'),
(3, 2, 'Las opciones vegetarianas estan muy bien pensadas.'),
(4, 3, 'El arroz tenia mucho sabor y el punto del marisco estaba muy bien.'),
(4, 5, 'Lugar perfecto para una cena tranquila cerca del puerto.');

INSERT INTO public.ratings (restaurant_id, user_id, calificacion)
VALUES
(1, 2, 5),
(1, 3, 4),
(1, 5, 5),
(2, 1, 5),
(2, 4, 4),
(2, 5, 4),
(3, 1, 4),
(3, 2, 5),
(3, 4, 4),
(4, 1, 5),
(4, 3, 5),
(4, 5, 4);
