DROP TABLE IF EXISTS video_note;
DROP TABLE IF EXISTS video_card;
DROP TABLE IF EXISTS sticky_note;
DROP TABLE IF EXISTS auth_session;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (MINVALUE 0),
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE TABLE auth_session (
    token CHAR(36) PRIMARY KEY UNIQUE NOT NULL,
    account INT NOT NULL REFERENCES account
);

CREATE TABLE video_card (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (MINVALUE 0),
    account INT NOT NULL REFERENCES account,
    video_id CHAR(11) NOT NULL,
    resume_timestamp INT
);

CREATE TABLE video_note (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    video INT NOT NULL REFERENCES video_card,
    text TEXT NOT NULL,
    timestamp INT
);

CREATE TABLE sticky_note (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    account INT NOT NULL REFERENCES account,
    text TEXT NOT NULL
);

INSERT INTO account (username, email, password)
VALUES ('test', 'test@test.com', '$2a$10$/WEvfEqVJ0PwzgAauGDgZuf/1v9QN3PULZjx5iMwAmxbrvsvaEZDa');

INSERT INTO video_card (account, video_id)
VALUES (0, 'LYdGfjtdtI4');

-- Clear any user named "registerTest" as this is only used for integration testing for the
-- /account/register POST endpoint
CREATE OR REPLACE FUNCTION delete_test_acc()
    RETURNS TRIGGER LANGUAGE plpgsql VOLATILE AS $$
    BEGIN
        DELETE FROM account WHERE username = NEW.username;
        RETURN NEW;
    END;
    $$;

CREATE OR REPLACE TRIGGER delete_test_acc
    AFTER INSERT
    ON account
    FOR EACH ROW
    WHEN (NEW.username = 'registerTest')
    EXECUTE PROCEDURE delete_test_acc();

-- Clear any video card with video ID "test       " as this is only used for integration testing for the
-- /video/card POST endpoint
CREATE OR REPLACE FUNCTION delete_test_card()
    RETURNS TRIGGER LANGUAGE plpgsql VOLATILE AS $$
    BEGIN
        DELETE FROM video_card WHERE video_id = NEW.video_id;
        RETURN NEW;
    END;
    $$;

CREATE OR REPLACE TRIGGER delete_test_card
    AFTER INSERT
    ON video_card
    FOR EACH ROW
    WHEN (NEW.video_id = 'test       ')
    EXECUTE PROCEDURE delete_test_card();
