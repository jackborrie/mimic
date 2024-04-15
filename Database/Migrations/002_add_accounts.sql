CREATE TABLE accounts (
    id TEXT,
    name TEXT,
    account_type TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE userAccounts (
    user_id TEXT,
    account_id TEXT,
    user_privilege TEXT,
    PRIMARY KEY (user_id, account_id)
);

CREATE TABLE transactions (
    id TEXT,
    account_id TEXT REFERENCES accounts(id),
    user_id TEXT REFERENCES "AspNetUsers"("Id"),
    PRIMARY KEY (id)
);





