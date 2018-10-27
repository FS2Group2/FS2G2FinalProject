-- -----------------------------------------------------
-- Schema eventtour
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventtour` DEFAULT CHARACTER SET utf8 ;
USE `eventtour`;

-- -----------------------------------------------------
-- Table `eventtour`.`accommodation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`accommodation` (
    A_ID BIGINT NOT NULL AUTO_INCREMENT,
    A_MIN_ORDER_TIME INTEGER,
    A_NAME VARCHAR(255),
    A_OWNER BIGINT,
    A_PRICE INTEGER,
    A_LOCATION BIGINT,
    PRIMARY KEY (`A_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`category` (
    CAT_ID BIGINT NOT NULL AUTO_INCREMENT,
    CAT_ICON VARCHAR(255),
    CAT_NAME VARCHAR(255),
    CAT_IMAGE VARCHAR(255),
    PRIMARY KEY (`CAT_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`event` (
    E_ID BIGINT NOT NULL AUTO_INCREMENT,
    E_API_ID VARCHAR(255),
    E_DATE TIMESTAMP,
    E_DURATION INTEGER,
    E_NAME VARCHAR(255),
    E_OWNER BIGINT,
    E_PRICE INTEGER,
    E_CATEGORY BIGINT,
    E_LOCATION BIGINT,
    E_EXTRA BIGINT,
    PRIMARY KEY (`E_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`event_extra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`event` (
    EE_ID BIGINT NOT NULL AUTO_INCREMENT,
    EE_DESCRIPTION VARCHAR(255),
    EE_PHOTO VARCHAR(255),
    PRIMARY KEY (`EE_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`profile` (
    PR_ID BIGINT NOT NULL AUTO_INCREMENT,
    PR_CITY_LIVING VARCHAR(255),
    PR_INFO VARCHAR(255),
    PR_PHOTO VARCHAR(255),
    PRIMARY KEY (`PR_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`purchase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`purchase` (
    P_ID BIGINT NOT NULL AUTO_INCREMENT,
    P_ACCOMMODATION BIGINT,
    P_EVENT BIGINT,
    P_TRANSFER_FROM BIGINT,
    P_TRANSFER_TO BIGINT,
    U_ID BIGINT,
    PRIMARY KEY (`P_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`role` (
    R_ID BIGINT NOT NULL AUTO_INCREMENT,
    R_NAME VARCHAR(255),
    PRIMARY KEY (`R_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`transfer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`transfer` (
    T_ID BIGINT NOT NULL AUTO_INCREMENT,
    T_DEPATR_TIME TIMESTAMP,
    T_DURATION INTEGER,
    T_NUMBER INTEGER,
    T_OWNER BIGINT,
    T_PRICE INTEGER,
    T_FROM BIGINT,
    T_TO BIGINT,
    T_TYPE BIGINT,
    PRIMARY KEY (`T_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`transport_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`transport_type` (
    TT_ID BIGINT NOT NULL AUTO_INCREMENT,
    TT_NAME VARCHAR(255),
    PRIMARY KEY (`TT_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`user` (
    U_ID BIGINT NOT NULL AUTO_INCREMENT,
    U_EMAIL VARCHAR(255),
    U_FIRST_NAME VARCHAR(255),
    U_IS_ACTIVE BOOLEAN NOT NULL,
    U_LAST_NAME VARCHAR(255),
    U_NAME VARCHAR(255),
    U_PASSWORD VARCHAR(255),
    U_DEFAULT_LOCATION BIGINT,
    U_PROFILE BIGINT,
    U_ROLE_ID BIGINT,
    PRIMARY KEY (`U_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`user_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`user_token` (
    TOKEN_ID BIGINT NOT NULL AUTO_INCREMENT,
    TOKEN VARCHAR(255),
    U_ID BIGINT NOT NULL
    PRIMARY KEY (`TOKEN_ID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `eventtour`.`wishlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eventtour`.`wishlist` (
    W_USER BIGINT NOT NULL,
    W_EVENT BIGINT NOT NULL
);
ENGINE = InnoDB;
