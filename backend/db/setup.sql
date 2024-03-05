DROP TABLE IF EXISTS video_note;
DROP TABLE IF EXISTS video_card;
DROP TABLE IF EXISTS auth_session;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE TABLE auth_session (
    token CHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    account INT REFERENCES account
);

CREATE TABLE video_card (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    account INT REFERENCES account,
    video_id CHAR(11) NOT NULL,
    resume_timestamp INT
);

CREATE TABLE video_note (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    video INT REFERENCES video_card,
    text TEXT,
    video_timestamp INT
);
