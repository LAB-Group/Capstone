\echo 'Delete and recreate Game On db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE gameon;
CREATE DATABASE gameon;
\connect gameon;

\i gameon-schema.sql