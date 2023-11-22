CREATE TABLE IF NOT EXISTS Admin (
    email VARCHAR(255) PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    roles VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS User (
    userId BINARY(16) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(255) DEFAULT 'USER',
    image LONGBLOB,
    fileSize BIGINT,
    date DATE,
    resetPasswordToken VARCHAR(255),
    CONSTRAINT CK_Roles CHECK (roles IN ('ADMIN', 'USER'))
);

CREATE TABLE IF NOT EXISTS Notes (
    noteId BINARY(16) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN,
    deleted BOOLEAN,
    date DATE,
    color VARCHAR(255),
    userId BINARY(16),
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE IF NOT EXISTS Trash (
    noteId BINARY(16) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN,
    deleted BOOLEAN,
    date DATE,
    color VARCHAR(255),
    userId BINARY(16),
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE IF NOT EXISTS Archived (
    noteId BINARY(16) NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN,
    archived BOOLEAN,
    date DATE,
    color VARCHAR(255),
    userId BINARY(16),
    FOREIGN KEY (userId) REFERENCES User(userId)
);
