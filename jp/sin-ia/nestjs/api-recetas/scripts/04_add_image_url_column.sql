\set ON_ERROR_STOP on
\encoding UTF8
SET client_encoding = 'UTF8';

ALTER TABLE public.recipes
ADD COLUMN IF NOT EXISTS image_url VARCHAR(300);
