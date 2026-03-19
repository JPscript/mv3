CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
  latitud DOUBLE PRECISION NOT NULL,
  longitud DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.recipes (
  id SERIAL PRIMARY KEY,
  restaurant_id INT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  ingredientes TEXT NOT NULL,
  tiempo_min INT NOT NULL CHECK (tiempo_min > 0),
  dificultad VARCHAR(20) NOT NULL CHECK (dificultad IN ('facil', 'media', 'dificil')),
  image_url VARCHAR(300),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

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

CREATE INDEX IF NOT EXISTS idx_users_nombre ON public.users(nombre);
CREATE INDEX IF NOT EXISTS idx_restaurants_nombre ON public.restaurants(nombre);
CREATE INDEX IF NOT EXISTS idx_recipes_nombre ON public.recipes(nombre);
CREATE INDEX IF NOT EXISTS idx_recipes_restaurant_id ON public.recipes(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_comments_restaurant_id ON public.comments(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_restaurant_id ON public.ratings(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON public.ratings(user_id);

DROP TRIGGER IF EXISTS trg_set_updated_at_users ON public.users;
CREATE TRIGGER trg_set_updated_at_users
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_set_updated_at_restaurants ON public.restaurants;
CREATE TRIGGER trg_set_updated_at_restaurants
BEFORE UPDATE ON public.restaurants
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_set_updated_at_recipes ON public.recipes;
CREATE TRIGGER trg_set_updated_at_recipes
BEFORE UPDATE ON public.recipes
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_set_updated_at_comments ON public.comments;
CREATE TRIGGER trg_set_updated_at_comments
BEFORE UPDATE ON public.comments
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_set_updated_at_ratings ON public.ratings;
CREATE TRIGGER trg_set_updated_at_ratings
BEFORE UPDATE ON public.ratings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
