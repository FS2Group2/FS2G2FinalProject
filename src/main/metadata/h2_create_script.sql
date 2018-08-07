
CREATE TABLE IF NOT EXISTS `role` (
  `r_id` INT NOT NULL,
  `r_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`r_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`user_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_profile` (
  `user_id` INT NOT NULL,
  `user_photo` VARCHAR(100) NULL,
  `user_info` VARCHAR(250) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `location_name` VARCHAR(45) NOT NULL,
  `l_country` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_country_idx` (`l_country` ASC) VISIBLE,
  CONSTRAINT `fk_country`
    FOREIGN KEY (`l_country`)
    REFERENCES `country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_name` VARCHAR(100) NOT NULL,
  `u_email` VARCHAR(45) NOT NULL,
  `u_password` VARCHAR(45) NOT NULL,
  `u_default_location` INT NULL,
  `role_r_id` INT NOT NULL,
  `u_profife` INT NOT NULL,
  PRIMARY KEY (`u_id`, `u_profife`),
  UNIQUE INDEX `u_email_UNIQUE` (`u_email` ASC) VISIBLE,
  INDEX `fk_user_role1_idx` (`role_r_id` ASC) VISIBLE,
  INDEX `fk_user_profile_idx` (`u_profife` ASC) VISIBLE,
  INDEX `fd_default_location_idx` (`u_default_location` ASC) VISIBLE,
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`role_r_id`)
    REFERENCES `role` (`r_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_profile`
    FOREIGN KEY (`u_profife`)
    REFERENCES `user_profile` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fd_default_location`
    FOREIGN KEY (`u_default_location`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`event_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `event_info` (
  `ei_id` INT NOT NULL AUTO_INCREMENT,
  `ei_photo` VARCHAR(200) NULL,
  `ei_description` VARCHAR(500) NULL,
  PRIMARY KEY (`ei_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `event` (
  `e_id` INT NOT NULL AUTO_INCREMENT,
  `e_name` VARCHAR(200) NOT NULL,
  `e_location` INT NULL,
  `e_date` DATETIME NULL,
  `e_owner` INT NULL,
  `e_duration` INT NULL,
  `e_info` INT NULL,
  `e_price` INT NULL,
  INDEX `fk_e_location_idx` (`e_location` ASC) VISIBLE,
  INDEX `fk_e_owner_idx` (`e_owner` ASC) VISIBLE,
  INDEX `fk_info_idx` (`e_info` ASC) VISIBLE,
  PRIMARY KEY (`e_id`),
  CONSTRAINT `fk_e_location`
    FOREIGN KEY (`e_location`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_e_owner`
    FOREIGN KEY (`e_owner`)
    REFERENCES `eventtour`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_info`
    FOREIGN KEY (`e_info`)
    REFERENCES `event_info` (`ei_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`transfer_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transfer_type` (
  `tt_id` INT NOT NULL AUTO_INCREMENT,
  `tt_name` VARCHAR(45) NULL,
  PRIMARY KEY (`tt_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`transfer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transfer` (
  `t_id` INT NOT NULL AUTO_INCREMENT,
  `t_type` INT NULL,
  `t_price` INT NULL,
  `t_owner` INT NULL,
  `t_duration` INT NULL,
  `t_from` INT NULL,
  `t_to` INT NULL,
  PRIMARY KEY (`t_id`),
  INDEX `fk_t_owner_idx` (`t_owner` ASC) VISIBLE,
  INDEX `fk_t_from_idx` (`t_from` ASC) VISIBLE,
  INDEX `fk_t_to_idx` (`t_to` ASC) VISIBLE,
  INDEX `fk_t_type_idx` (`t_type` ASC) VISIBLE,
  CONSTRAINT `fk_t_owner`
    FOREIGN KEY (`t_owner`)
    REFERENCES `eventtour`.`user` (`u_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_t_from`
    FOREIGN KEY (`t_from`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_to`
    FOREIGN KEY (`t_to`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_type`
    FOREIGN KEY (`t_type`)
    REFERENCES `transfer_type` (`tt_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`accomodation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `accomodation` (
  `a_id` INT NOT NULL AUTO_INCREMENT,
  `a_name` VARCHAR(45) NULL,
  `a_owner` INT NULL,
  `a_max_persons` INT NULL,
  `a_price` INT NULL,
  `a_location` INT NULL,
  `a_min_delta_t` INT NULL,
  PRIMARY KEY (`a_id`),
  INDEX `fk_a_owner_idx` (`a_owner` ASC) VISIBLE,
  INDEX `fk_a_location_idx` (`a_location` ASC) VISIBLE,
  CONSTRAINT `fk_a_owner`
    FOREIGN KEY (`a_owner`)
    REFERENCES `user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_a_location`
    FOREIGN KEY (`a_location`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`wishlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wishlist` (
  `w_user` INT NOT NULL,
  `w_event` INT NOT NULL,
  PRIMARY KEY (`w_user`, `w_event`),
  INDEX `fk_w_event_idx` (`w_event` ASC) VISIBLE,
  CONSTRAINT `fk_w_user`
    FOREIGN KEY (`w_user`)
    REFERENCES `user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_w_event`
    FOREIGN KEY (`w_event`)
    REFERENCES `event` (`e_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eventtour`.`purchase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `purchase` (
  `p_id` INT NULL AUTO_INCREMENT,
  `p_user` INT NOT NULL,
  `p_event` INT NOT NULL,
  `p_transfer` INT NULL,
  `p_accomodation` INT NULL,
  PRIMARY KEY (`p_user`),
  INDEX `fk_p_event_idx` (`p_event` ASC) VISIBLE,
  INDEX `fk_p_transfer_idx` (`p_transfer` ASC) VISIBLE,
  INDEX `fk_p_accomodation_idx` (`p_accomodation` ASC) VISIBLE,
  CONSTRAINT `fk_p_user`
    FOREIGN KEY (`p_user`)
    REFERENCES `eventtour`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_p_event`
    FOREIGN KEY (`p_event`)
    REFERENCES `event` (`e_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_p_transfer`
    FOREIGN KEY (`p_transfer`)
    REFERENCES `transfer` (`t_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_p_accomodation`
    FOREIGN KEY (`p_accomodation`)
    REFERENCES `accomodation` (`a_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Data for table `eventtour`.`role`
-- -----------------------------------------------------

INSERT INTO `role` (`r_id`, `r_name`) VALUES (1, 'user');
INSERT INTO `role` (`r_id`, `r_name`) VALUES (2, 'supplier');
INSERT INTO `role` (`r_id`, `r_name`) VALUES (3, 'admin');

-- -----------------------------------------------------
-- Data for table `eventtour`.`transfer_type`
-- -----------------------------------------------------

INSERT INTO `transfer_type` (`tt_id`, `tt_name`) VALUES (1, 'bus');
INSERT INTO `transfer_type` (`tt_id`, `tt_name`) VALUES (2, 'air');
INSERT INTO `transfer_type` (`tt_id`, `tt_name`) VALUES (3, 'train');
INSERT INTO `transfer_type` (`tt_id`, `tt_name`) VALUES (4, 'ship');
INSERT INTO `transfer_type` (`tt_id`, `tt_name`) VALUES (5, 'taxi');

