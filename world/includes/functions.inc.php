<?php
	// functions.inc.php
	/* Verbindungsdaten für NRW Datenbank laden */
	include "conn.inc.php";

	/*  connectdb() 
			stellt Verbindung zur Datenbank her 
			$mysqli ist mysqli-Objekt für Zugriff auf die Datenbank
			*/
	function connectdb(){
		global $mysqlhost;
		global $mysqluser;
		global $mysqlpasswd;
		global $mysqldb;
		global $mysqli;
		// Verbindung zum Server herstellen, @ unterdrückt evtl. Fehler	
		$mysqli = @new mysqli($mysqlhost, $mysqluser, $mysqlpasswd, $mysqldb);
		if($mysqli -> connect_error) {
			header($_SERVER["SERVER_PROTOCOL"]." 500 Internal Server Error"); 
			// Das gehört eigentlich in ein Logfile und nicht in die Öffentlichkeit!!!
			die("Keine Verbindung möglich. " . $mysqli->connect_error);	
			return false;
		}
		// Datenaustausch mit MySQL Server auf Unicode-Kodierung einstellen
		$mysqli -> query("SET NAMES 'utf8'");
		return true;
	}
	/* closedb() 
			Schließt die Datenbank-Verbindung und gibt die Ressourcen frei
	*/
	function closedb(){
		global $mysqli, $stmt, $resultat;
		$stmt			->	free_result();
		$resultat	->	free();
		$mysqli		->	close();
	}
?>