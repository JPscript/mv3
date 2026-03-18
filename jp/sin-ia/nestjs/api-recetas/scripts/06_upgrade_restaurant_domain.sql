CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE,
  image_url VARCHAR(300),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.restaurants (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  fotografia_url VARCHAR(300),
  latitud DOUBLE PRECISION NOT NULL DEFAULT 40.416775,
  longitud DOUBLE PRECISION NOT NULL DEFAULT -3.703790,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE public.recipes
ADD COLUMN IF NOT EXISTS restaurant_id INT;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.restaurants) THEN
    INSERT INTO public.restaurants (nombre, descripcion, fotografia_url, latitud, longitud)
    VALUES (
      'Restaurante Migrado',
      'Restaurante por defecto para vincular recetas existentes durante la migracion.',
      'http://localhost:3000/files/restaurant-migrado.jpg',
      40.416775,
      -3.703790
    );
  END IF;
END $$;

UPDATE public.recipes
SET restaurant_id = COALESCE(restaurant_id, 1)
WHERE restaurant_id IS NULL;

ALTER TABLE public.recipes
ALTER COLUMN restaurant_id SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'fk_recipes_restaurant_id'
  ) THEN
    ALTER TABLE public.recipes
    ADD CONSTRAINT fk_recipes_restaurant_id
    FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.comments (
  id SERIAL PRIMARY KEY,
  restaurant_id INT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  comentario TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ratings (
  id SERIAL PRIMARY KEY,
  restaurant_id INT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_ratings_restaurant_user UNIQUE (restaurant_id, user_id)
);