CREATE TABLE diagnosis_codes (
    id      int unsigned   NOT NULL AUTO_INCREMENT,
    code    varchar(10)    NOT NULL,
    disease varchar(255)   NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY diagnosis_codes_code_unique (code),
    KEY diagnosis_codes_code_disease_index (code, disease)
);

CREATE TABLE users
(
    id         int unsigned                            NOT NULL AUTO_INCREMENT,
    username   varchar(80)   NOT NULL,
    email      varchar(254)  NOT NULL,
    password   varchar(60)   NOT NULL,
    is_active  bit      default 0                      NOT NULL,
    created_at datetime DEFAULT NULL,
    updated_at datetime DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY users_email_unique (email)
);

CREATE TABLE patients
(
    id         int unsigned                           NOT NULL AUTO_INCREMENT,
    user_id    int(11) unsigned                       NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name  varchar(50)  NOT NULL,
    phone      varchar(50)                            NOT NULL,
    email      varchar(100)  DEFAULT NULL,
    note       text,
    created_at datetime                                DEFAULT NULL,
    updated_at datetime                                DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY patients_first_name_last_name_phone_unique (first_name, last_name, phone),
    CONSTRAINT patients_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE roles
(
    id   int unsigned NOT NULL AUTO_INCREMENT,
    name varchar(45)  NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users_roles
(
    user_id int(11) unsigned NOT NULL,
    role_id int(11) unsigned NOT NULL,
    KEY user_fk_id (user_id),
    KEY role_fk_id (role_id),
    CONSTRAINT user_fk_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT role_fk_id FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE confirmation_tokens
(
    id          int unsigned     NOT NULL AUTO_INCREMENT,
    user_id     int(11) unsigned NOT NULL,
    token       varchar(255)     NOT NULL,
    expiry_date datetime         NOT NULL,
    PRIMARY KEY (id),
    KEY confirmation_tokens_fk_users_id (user_id),
    KEY confirmation_tokens_key_token (token),
    CONSTRAINT confirmation_tokens_fk_users_id FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE diagnosis_histories
(
    id                int unsigned                    NOT NULL AUTO_INCREMENT,
    diagnosis_code_id int unsigned                    NOT NULL,
    doctors_diagnosis text  NOT NULL,
    therapy           text,
    control           text,
    referral          text,
    anamnesis         text,
    created_at        datetime DEFAULT NULL,
    updated_at        datetime DEFAULT NULL,
    patient_id        int unsigned                    NOT NULL,
    PRIMARY KEY (id),
    KEY diagnosis_histories_diagnosis_code_id_foreign (diagnosis_code_id),
    KEY diagnosis_histories_patient_id_foreign (patient_id),
    CONSTRAINT diagnosis_histories_diagnosis_code_id_foreign FOREIGN KEY (diagnosis_code_id) REFERENCES diagnosis_codes (id),
    CONSTRAINT diagnosis_histories_patient_id_foreign FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
);

CREATE TABLE images
(
    id          int unsigned                            NOT NULL AUTO_INCREMENT,
    patient_id  int unsigned                            DEFAULT NULL,
    file_name   varchar(255)  NOT NULL,
    description varchar(255)  DEFAULT NULL,
    created_at  datetime                                DEFAULT NULL,
    updated_at  datetime                                DEFAULT NULL,
    PRIMARY KEY (id),
    KEY images_patient_id_foreign (patient_id),
    CONSTRAINT images_patient_id_foreign FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
);
