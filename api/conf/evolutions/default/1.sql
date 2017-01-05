# -- create user table

# --- !Ups

CREATE TABLE IF NOT EXISTS "user"
(
  id       BIGSERIAL NOT NULL,
  name     VARCHAR(50),
  password VARCHAR(50),
  CONSTRAINT pk_user_id PRIMARY KEY (id)
);

# --- !Downs

DROP TABLE IF EXISTS "user";

