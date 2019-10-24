DROP DATABASE IF EXISTS cs3320;
CREATE DATABASE cs3320;
USE cs3320;

CREATE TABLE UserCredentials
(
	userId int NOT NULL AUTO_INCREMENT,
	userName varchar(50) NOT NULL,
	pass varchar(50) NOT NULL,
	PRIMARY KEY (userId)
);

CREATE TABLE UserInformation
(
	userId int NOT NULL,
	fullname varchar(50) NOT NULL,
	address1 varchar(50) NOT NULL,
    address2 varchar(50),
    city varchar(50) NOT NULL,
    state varchar(50) NOT NULL,
    zip int NOT NULL,
	FOREIGN KEY (userId) REFERENCES UserCredentials(userId)
);


CREATE TABLE ShippingInformation (
    userId int NOT NULL,
	address1 varchar(50) NOT NULL,
    address2 varchar(50),
    city varchar(50) NOT NULL,
    state varchar(50) NOT NULL,
    zip int NOT NULL,
	FOREIGN KEY (userId) REFERENCES UserCredentials(userId)
);

CREATE TABLE PaymentInformation (
    userId int NOT NULL,
	cardType varchar(50) NOT NULL,
    cardNumber int NOT NULL,
    expDate varchar(5),
    PRIMARY KEY(cardType, cardNumber, expDate),
	FOREIGN KEY (userId) REFERENCES UserCredentials(userId)
);

CREATE TABLE Products (
    productId int NOT NULL AUTO_INCREMENT,
	description varchar(50) NOT NULL,
    unitPrice decimal(13, 2),
    expDate varchar(5),
    PRIMARY KEY (productID)
);

CREATE TABLE Orders (
    userId int NOT NULL,
    orderNumber int NOT NULL,
	productId int NOT NULL,
    quantity int NOT NULL,
    totalPrice decimal(13, 2),
    FOREIGN KEY (userId) REFERENCES UserCredentials(userId),
    FOREIGN KEY (productId) REFERENCES Products(productId),
    PRIMARY KEY (userId, orderNumber, productId)
);

create table state
(
    state_id   smallint    unsigned not null auto_increment comment 'PK: State ID',
    state_name varchar(32) not null comment 'State name with first letter capital',
    state_abbr varchar(8)  comment 'Optional state abbreviation (US 2 cap letters)',
    primary key (state_id)
)
    charset utf8
    collate utf8_unicode_ci
;
 
insert into state
values
    (NULL, 'Alabama', 'AL'),
    (NULL, 'Alaska', 'AK'),
    (NULL, 'Arizona', 'AZ'),
    (NULL, 'Arkansas', 'AR'),
    (NULL, 'California', 'CA'),
    (NULL, 'Colorado', 'CO'),
    (NULL, 'Connecticut', 'CT'),
    (NULL, 'Delaware', 'DE'),
    (NULL, 'District of Columbia', 'DC'),
    (NULL, 'Florida', 'FL'),
    (NULL, 'Georgia', 'GA'),
    (NULL, 'Hawaii', 'HI'),
    (NULL, 'Idaho', 'ID'),
    (NULL, 'Illinois', 'IL'),
    (NULL, 'Indiana', 'IN'),
    (NULL, 'Iowa', 'IA'),
    (NULL, 'Kansas', 'KS'),
    (NULL, 'Kentucky', 'KY'),
    (NULL, 'Louisiana', 'LA'),
    (NULL, 'Maine', 'ME'),
    (NULL, 'Maryland', 'MD'),
    (NULL, 'Massachusetts', 'MA'),
    (NULL, 'Michigan', 'MI'),
    (NULL, 'Minnesota', 'MN'),
    (NULL, 'Mississippi', 'MS'),
    (NULL, 'Missouri', 'MO'),
    (NULL, 'Montana', 'MT'),
    (NULL, 'Nebraska', 'NE'),
    (NULL, 'Nevada', 'NV'),
    (NULL, 'New Hampshire', 'NH'),
    (NULL, 'New Jersey', 'NJ'),
    (NULL, 'New Mexico', 'NM'),
    (NULL, 'New York', 'NY'),
    (NULL, 'North Carolina', 'NC'),
    (NULL, 'North Dakota', 'ND'),
    (NULL, 'Ohio', 'OH'),
    (NULL, 'Oklahoma', 'OK'),
    (NULL, 'Oregon', 'OR'),
    (NULL, 'Pennsylvania', 'PA'),
    (NULL, 'Rhode Island', 'RI'),
    (NULL, 'South Carolina', 'SC'),
    (NULL, 'South Dakota', 'SD'),
    (NULL, 'Tennessee', 'TN'),
    (NULL, 'Texas', 'TX'),
    (NULL, 'Utah', 'UT'),
    (NULL, 'Vermont', 'VT'),
    (NULL, 'Virginia', 'VA'),
    (NULL, 'Washington', 'WA'),
    (NULL, 'West Virginia', 'WV'),
    (NULL, 'Wisconsin', 'WI'),
    (NULL, 'Wyoming', 'WY')
;