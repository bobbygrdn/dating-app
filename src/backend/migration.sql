DROP DATABASE IF EXISTS findluv;
CREATE DATABASE findluv;

\c findluv;

-- DROP TABLE IF EXISTS landing_page, users, pending_connections messages, threads, inbox;

CREATE TABLE landing_page(
    img_id SERIAL PRIMARY KEY,
    img_url TEXT
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    profile_pic_url TEXT,
    age NUMERIC,
    height TEXT,
    body_type TEXT,
    gender VARCHAR(10),
    bio TEXT,
    sexual_orientation VARCHAR(20),
    city VARCHAR(85),
    state VARCHAR(50),
    zipcode VARCHAR(10)
);

CREATE TABLE pending_connections(
    requesting_user_id INTEGER,
    foreign key(requesting_user_id) references users(user_id),
    liked_user_id INTEGER,
    foreign key(liked_user_id) references users(user_id)
);

CREATE TABLE messages(
    message_id SERIAL PRIMARY KEY,
    content TEXT,
    date_time_stamp TEXT,
    read_receipt BOOLEAN,
    sent_from_user_id INTEGER,
    foreign key(sent_from_user_id) references users(user_id),
    sent_to_user_id INTEGER,
    foreign key(sent_to_user_id) references users(user_id)
);

CREATE TABLE threads(
    thread_id SERIAL PRIMARY KEY,
    message_id INTEGER,
    foreign key(message_id) references messages(message_id)
);

CREATE TABLE inbox(
    inbox_id SERIAL PRIMARY KEY,
    inbox_owner_user_id INTEGER,
    foreign key(inbox_owner_user_id) references users(user_id),
    thread_id INTEGER,
    foreign key(thread_id) references threads(thread_id)
);

