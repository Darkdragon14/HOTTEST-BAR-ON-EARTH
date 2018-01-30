-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: NightAdvisor
-- Source Schemata: nightadvisor
-- Created: Tue Jan 23 21:31:26 2018
-- Workbench Version: 6.3.7
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema NightAdvisor
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `NightAdvisor` ;
CREATE SCHEMA IF NOT EXISTS `NightAdvisor` ;

-- ----------------------------------------------------------------------------
-- Table NightAdvisor.avis
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `NightAdvisor`.`avis` (
  `note` INT(11) NOT NULL,
  `IDuser` INT(11) NOT NULL,
  `IDbar` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table NightAdvisor.login
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `NightAdvisor`.`login` (
  `user_id` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `stayConnected` VARCHAR(255) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table NightAdvisor.profilBar
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `profilBar` (
`name` JSON DEFAULT NULL,
`location` JSON DEFAULT NOT NULL,
`email` VARCHAR(255) NOT NULL,
`phone` VARCHAR(255) NOT NULL,
`picture` JSON NOT NULL,
`nat` VARCHAR(255) NOT NULL,
`favoris` VARCHAR(255) NOT NULL,
`moyenneAvis` VARCHAR(255) NOT NULL,
`nbAvis` VARCHAR(255) NOT NULL,
`ambiance` VARCHAR(255) NOT NULL,
`frequentation` VARCHAR(255) NOT NULL,
`freqMax` VARCHAR(255) NOT NULL,
`temperature` VARCHAR(255) NOT NULL,
`horaire` VARCHAR(255) NOT NULL,
`infoComp` JSON NOT NULL,
`login` JSON NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table NightAdvisor.profilUser
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `NightAdvisor`.`profilUser` (
  `nom` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NOT NULL,
  `pseudo` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `dateNaissance` VARCHAR(255) NOT NULL,
  `adresse` VARCHAR(255) NOT NULL,
  `codePostal` VARCHAR(255) NOT NULL,
  `ville` VARCHAR(255) NOT NULL,
  `styleMusique` VARCHAR(255) NOT NULL,
  `prefAmbiance` VARCHAR(255) NOT NULL,
  `prefFrequentation` VARCHAR(255) NOT NULL,
  `prefTemperature` VARCHAR(255) NOT NULL,
  `barPref1` VARCHAR(255) NOT NULL,
  `barPref2` VARCHAR(255) NOT NULL,
  `barPref3` VARCHAR(255) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table NightAdvisor.register
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `NightAdvisor`.`register` (
  `user_id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isPro` VARCHAR(255) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;
SET FOREIGN_KEY_CHECKS = 1;
