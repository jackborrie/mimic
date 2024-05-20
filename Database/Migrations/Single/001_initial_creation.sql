CREATE TABLE authors
(
    id         TEXT NOT NULL PRIMARY KEY,
    name       TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags
(
    id         TEXT       NOT NULL PRIMARY KEY,
    text       TEXT       NOT NULL,
    color      VARCHAR(8) NOT NULL,
    icon       TEXT       NOT NULL,
    icon_pos   TEXT       NOT NULL DEFAULT 'left',
    created_at TIMESTAMP           DEFAULT NOW(),
    updated_at TIMESTAMP           DEFAULT NOW()
);

CREATE TABLE series
(
    id         TEXT NOT NULL PRIMARY KEY,
    name       TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE books
(
    id           TEXT NOT NULL PRIMARY KEY,
    title        TEXT NOT NULL,
    path         TEXT NOT NULL,
    description  TEXT,
    has_cover    BOOLEAN   DEFAULT FALSE,
    created_at   TIMESTAMP DEFAULT NOW(),
    updated_at   TIMESTAMP DEFAULT NOW(),

    series_id    TEXT REFERENCES series (id) ON DELETE SET NULL,
    series_index INT
);

CREATE TABLE book_authors
(
    book_id   TEXT NOT NULL,
    author_id TEXT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE
);

CREATE TABLE book_tags
(
    book_id TEXT NOT NULL,
    tag_id  TEXT NOT NULL,
    PRIMARY KEY (book_id, tag_id),
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);