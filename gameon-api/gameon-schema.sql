CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    handle      TEXT,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    location    TEXT,
    twitter     TEXT,
    facebook    TEXT,
    instagram   TEXT,
    image_url   TEXT,
    game_list   INTEGER[],
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(username)
);

CREATE TABLE events (
    id          SERIAL PRIMARY KEY,
    event_name  TEXT NOT NULL,
    event_start_date  DATE NOT NULL DEFAULT NOW(),
    event_end_date  DATE NOT NULL DEFAULT NOW(),
    event_type  TEXT NOT NULL,
    location    TEXT NOT NULL,
    event_game  INTEGER[] NOT NULL,
    details     TEXT NOT NULL,
    event_image_url   TEXT NOT NULL,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE registered_events (
    id          SERIAL PRIMARY KEY,
    event_game  INTEGER[] NOT NULL,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    event_id     INTEGER NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    registered_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE igdb_local (
    id                  SERIAL PRIMARY KEY,
    game_id             INTEGER NOT NULL,
    game_name           TEXT NOT NULL,
    game_summary        TEXT NOT NULL,
    game_image_url      TEXT NOT NULL,
    UNIQUE(game_id)
);

CREATE TABLE posts (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT NOT NULL,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    event_id     INTEGER NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE post_replies (
    id          SERIAL PRIMARY KEY,
    reply       TEXT NOT NULL,
    user_id     INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    post_id     INTEGER NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);