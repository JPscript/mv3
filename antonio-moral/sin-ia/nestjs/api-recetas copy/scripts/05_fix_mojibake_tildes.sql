-- Script de reparación de texto mojibake (ej: limÃ³n -> limón)
-- Proyecto: api-recetas | Grupo Ladrillos
-- Uso recomendado:
-- 1) Ejecutar con psql en UTF-8:
--    set PGCLIENTENCODING=UTF8
--    psql -h localhost -U postgres -d api_recetas_db -f scripts/05_fix_mojibake_tildes.sql
--
-- Comando listo para PowerShell (copiar/pegar):
-- $env:PGPASSWORD='1234'; $env:PGCLIENTENCODING='UTF8'; psql -h localhost -p 5432 -U postgres -d api_recetas_db -f "c:\Base\Juan\Trabajo\Master\MasterV3\mv3\jp\sin-ia\nestjs\api-recetas\scripts\05_fix_mojibake_tildes.sql"
--
-- Comando listo para CMD:
-- set PGPASSWORD=1234 && set PGCLIENTENCODING=UTF8 && psql -h localhost -p 5432 -U postgres -d api_recetas_db -f "c:\Base\Juan\Trabajo\Master\MasterV3\mv3\jp\sin-ia\nestjs\api-recetas\scripts\05_fix_mojibake_tildes.sql"
-- 2) Este script crea backup por tabla antes de actualizar.
-- 3) Por defecto trabaja sobre esquema public.

BEGIN;

DO $$
DECLARE
  v_schema text := 'public';
  v_today text := to_char(current_date, 'YYYYMMDD');

  v_table record;
  v_set_clause text;
  v_where_clause text;
  v_sql text;
BEGIN
  FOR v_table IN
    SELECT t.table_schema, t.table_name
    FROM information_schema.tables t
    WHERE t.table_schema = v_schema
      AND t.table_type = 'BASE TABLE'
      AND t.table_name NOT LIKE '%_backup_encoding_%'
    ORDER BY t.table_name
  LOOP
    SELECT
      string_agg(
        format(
          '%1$I = CASE WHEN encode(convert_to(%1$I::text, ''UTF8''), ''hex'') ~ ''(c383|c382)'' THEN convert_from(convert_to(%1$I::text, ''LATIN1''), ''UTF8'') ELSE %1$I END',
          c.column_name
        ),
        ', '
      ),
      string_agg(
        format(
          'encode(convert_to(%1$I::text, ''UTF8''), ''hex'') ~ ''(c383|c382)''',
          c.column_name
        ),
        ' OR '
      )
    INTO v_set_clause, v_where_clause
    FROM information_schema.columns c
    WHERE c.table_schema = v_table.table_schema
      AND c.table_name = v_table.table_name
      AND c.data_type IN ('text', 'character varying', 'character');

    IF v_set_clause IS NULL OR v_where_clause IS NULL THEN
      CONTINUE;
    END IF;

    v_sql := format(
      'CREATE TABLE IF NOT EXISTS %1$I.%2$I_backup_encoding_%3$s AS TABLE %1$I.%2$I;',
      v_table.table_schema,
      v_table.table_name,
      v_today
    );
    EXECUTE v_sql;

    v_sql := format(
      'UPDATE %1$I.%2$I SET %3$s WHERE %4$s;',
      v_table.table_schema,
      v_table.table_name,
      v_set_clause,
      v_where_clause
    );
    EXECUTE v_sql;
  END LOOP;
END
$$;

COMMIT;

-- Verificación rápida (ejemplo):
-- SELECT id, nombre, descripcion, ingredientes FROM public.recipes ORDER BY id DESC LIMIT 20;
