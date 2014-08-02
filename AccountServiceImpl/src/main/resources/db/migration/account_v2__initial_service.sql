CREATE SEQUENCE seq_accounts START WITH 1 INCREMENT BY 1 NOCACHE;

CREATE TABLE account 
(
  id			NUMBER(19,0) NOT NULL,
  email			VARCHAR2(16) NOT NULL,
  name 			VARCHAR2(16) NOT NULL,
  surname		VARCHAR2(16)  NOT NULL,
  password		VARCHAR2(256) NOT NULL,
  
  PRIMARY KEY ( id ),
  
  CONSTRAINT account_unique_fields UNIQUE (email));
);