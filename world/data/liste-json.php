<?php
  include "../includes/functions.inc.php";
	connectdb();
  sleep(1);
  header("Content-Type: application/json; encoding=UTF-8");

  $liste = isset($_POST['liste']) ? $_POST['liste'] : 
              (isset($_GET['liste']) ? $_GET['liste'] : '' );
  $suche = isset($_POST['suche']) ? $_POST['suche'] : 
              (isset($_GET['suche']) ? $_GET['suche'] : '' );
  $sql = "";
	
  switch ($liste) {
      case "regionen":
          $sql = "SELECT DISTINCT Region 
                  FROM Country 
                  WHERE Continent = ? 
                  ORDER BY Region;";
          break;
      case "laender":
          $sql = "SELECT DISTINCT Name AS Land 
                  FROM Country 
                  WHERE Region = ? 
                  ORDER BY Name;";        
          break;
      case "staedte":
					$sql = "SELECT city.ID, city.Name from country
									JOIN city ON country.Code=city.CountryCode
                  WHERE country.Name=?
                  ORDER BY city.Name ASC;";				
          break;
      case "landesinfo":
          $sql = "SELECT * FROM country 
                  WHERE name=?";
          break;
      case "stadtinfo":
          $sql = "SELECT Name, District, Population FROM city 
                  WHERE ID=?";
          break;		
  }
  if($sql == "") {
    $ergebnis = array("Daten" => "Ungültige Anfrage. Keine Daten.");
		die(json_encode($ergebnis));
  } else {
    $stmt   =   $mysqli ->  prepare($sql); 
    if($liste == "stadtinfo") {    
      $stmt   ->  bind_param("i", $suche);
    } else {
      $stmt   ->  bind_param("s", $suche);    
    }
    $stmt   ->  execute();
    $resultat = $stmt  ->  get_result();
    $daten = array();
    while($rs = $resultat -> fetch_assoc()){
        $daten[] = $rs; 
    }
    $ergebnis = array("Daten" => $daten);
  }
  echo json_encode($ergebnis);
  closedb();
?>