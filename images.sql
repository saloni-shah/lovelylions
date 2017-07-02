


CREATE TABLE artist(
   id   SERIAL PRIMARY KEY,
   username    VARCHAR(255) NOT NULL,
   email    VARCHAR(255) NOT NULL,
   facebookId  VARCHAR(255) NOT NULL,
   token VARCHAR(255) NOT NULL,
   name VARCHAR(255) NOT NULL
);

CREATE TABLE head (
    id      SERIAL PRIMARY KEY,
    _path    VARCHAR(50) NOT NULL,
    user_id  INTEGER references artist(id)
);

CREATE TABLE torso (
    id      SERIAL PRIMARY KEY,
    _path    VARCHAR(50) NOT NULL,
    user_id  INTEGER references artist(id)
);

CREATE TABLE legs (
    id      SERIAL PRIMARY KEY,
    _path    VARCHAR(50) NOT NULL,
    user_id  INTEGER references artist(id)
);

CREATE TABLE final_image (
    id      SERIAL PRIMARY KEY,
    head_id     INTEGER references head(id),
    torso_id     INTEGER references torso(id),
    legs_id     INTEGER references legs(id),
    user_id     INTEGER references artist(id)
);

insert into artist (username, email, facebookId, token, name)  values ( 'regina', 'regina@ymail.com', 'reginaFB', 'token1234', 'regina' );
-- insert into artist (username, email)  values ( 'lisa', 'lisa@ymail.com' );
-- insert into artist (username, email)  values ( 'jenny', 'jenny@ymail.com' );
-- insert into artist (username, email)  values ( 'cathy', 'cathy@ymail.com' );
insert into artist (username, email, facebookId, token, name) values ('dummy', 'dummyemail@test.com', 'dummyuser', 'NA', 'dummyperson');
insert into torso (_path, user_id )  values ( 'abc_path', 1 );
insert into torso (_path, user_id )  values ( 'def_path', 1 );
insert into legs (_path, user_id )  values ( 'ghi_path', 1 );
insert into legs (_path, user_id )  values ( 'jkl_path', 1 );
insert into head (_path, user_id )  values ( 'eft_path', 1 );

insert into head (_path, user_id )  values ( 'abk_path', 1 );
-- original database pictures will be using USER ID (1) in artist schema
