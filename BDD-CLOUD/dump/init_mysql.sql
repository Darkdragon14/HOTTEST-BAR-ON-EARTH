//Création des tables MySQL

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

//Achille

CREATE TABLE IF NOT EXISTS `login` (
`user_id` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`stayConnected` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `register` (
`user_id` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`isPro` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `profilUser` (
`nom` varchar(255) NOT NULL,
`prenom` varchar(255) NOT NULL,
`pseudo` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL,
`dateNaissance` varchar(255) NOT NULL,
`adresse` varchar(255) NOT NULL,
`codePostal` varchar(255) NOT NULL,
`ville` varchar(255) NOT NULL,
`styleMusique` varchar(255) NOT NULL,
`prefAmbiance` varchar(255) NOT NULL,
`prefFrequentation` varchar(255) NOT NULL,
`prefTemperature` varchar(255) NOT NULL,
`barPref1` varchar(255) NOT NULL,
`barPref2` varchar(255) NOT NULL,
`barPref3` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `profilBar` (
`nom` varchar(255) NOT NULL,
`adresse` varchar(255) NOT NULL,
`codePostal` varchar(255) NOT NULL,
`ville` varchar(255) NOT NULL,
`horaires` varchar(255) NOT NULL,
`frequentationMax` varchar(255) NOT NULL,
`styleMusique` varchar(255) NOT NULL,
`description` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


//Tristan

CREATE TABLE IF NOT EXISTS `avis` (
`note` int(11) NOT NULL,
`IDuser` int(11) NOT NULL,
`IDbar` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `Person` (`note`, `IDuser`, `IDbar`) VALUES
(1, 12345, 98765),
(2, 67890, 54321);


