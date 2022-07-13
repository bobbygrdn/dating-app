--  DROP DATABASE IF EXISTS findluv;
--  CREATE DATABASE findluv;
--
--  \c findluv;

DROP TABLE IF EXISTS landing_page, users, pending_connections, messages, threads;

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
    gender VARCHAR(15),
    bio TEXT,
    sexual_orientation VARCHAR(20),
    city VARCHAR(85),
    state VARCHAR(50),
    zipcode VARCHAR(10) NOT NULL,
    dark_theme BOOLEAN,
    font_size TEXT,
    font_style TEXT
);

CREATE TABLE pending_connections(
    pending_connections_id SERIAL PRIMARY KEY,
    requesting_user_id INTEGER,
    foreign key(requesting_user_id) references users(user_id),
    liked_user_id INTEGER,
    foreign key(liked_user_id) references users(user_id)
);

CREATE TABLE threads(
    thread_id SERIAL PRIMARY KEY,
    recipient_user_id INTEGER,
    foreign key(recipient_user_id) references users(user_id),
    sender_user_id INTEGER,
    foreign key(sender_user_id) references users(user_id)
);

CREATE TABLE messages(
    message_id SERIAL PRIMARY KEY,
    content TEXT,
    date_stamp TEXT,
    time_stamp TEXT,
    read_receipt BOOLEAN,
    thread_id INTEGER,
    foreign key(thread_id) references threads(thread_id),
    sent_from_user_id INTEGER,
    foreign key(sent_from_user_id) references users(user_id),
    sent_to_user_id INTEGER,
    foreign key(sent_to_user_id) references users(user_id)
);

