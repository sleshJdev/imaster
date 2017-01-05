# -- create table role and user_role

# --- !Ups

CREATE TABLE IF NOT EXISTS role (
  id          BIGINT NOT NULL,
  name        VARCHAR(20),
  description VARCHAR(50),
  CONSTRAINT pk_role_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_cr_role (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  CONSTRAINT pk_user_cr_role_user_id_role_id PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user_cr_role_user_id_user_id
    FOREIGN KEY (user_id) REFERENCES "user" (id)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_user_cr_role_user_id_role_id
    FOREIGN KEY (role_id) REFERENCES "role" (id)
    ON DELETE NO ACTION ON UPDATE NO ACTION
);

# -- !Downs

DROP TABLE IF EXISTS user_cr_role;
DROP TABLE IF EXISTS role;