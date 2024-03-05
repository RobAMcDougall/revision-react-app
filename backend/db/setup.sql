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

-- Clear any user named "registerTest" as this is only used for integration testing for the
-- /account/register endpoint
-- 
-- in fact, this isn't used at all, since Supertest doesn't make any real requests to the DB :^)
CREATE OR REPLACE FUNCTION delete_register_test_acc()
RETURNS TRIGGER LANGUAGE plpgsql VOLATILE AS $$
BEGIN
    DELETE FROM account WHERE username = NEW.username;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER delete_register_test_acc
    AFTER INSERT
    ON account
    FOR EACH ROW
    WHEN (NEW.username = 'registerTest')
    EXECUTE PROCEDURE delete_register_test_acc();
