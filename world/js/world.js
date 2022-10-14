/* 
	Die Kontinente sind als Konstante hinterlegt, 
	so dass Sie für das erste Select-Feld keine 
	Daten vom Server abrufen müssen.
  	Folgende Kontinente haben keine Regionen:
		["Antarctica", "South America"]
 */
(()=>{
	"use strict";
	
	const KONTINENTE = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Antarctica"];

		fetch("./world.json")
		.then(response => {
		return response.json();
		})
		.then(jsondata => console.log(jsondata));

	window.onload = function () {
	
		//HTML Elemente
		var kontinent = document.getElementById("kontinent");
		var region = document.getElementById("region");	
		var land = document.getElementById("land");
		var stadt = document.getElementById("stadt");
		
		//kontinente laden
		for(var i = 0; i < KONTINENTE.length; i++) {
			var opt = KONTINENTE[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			kontinent.appendChild(el);
		}
		
		//kontinent ändert sich
		kontinent.onchange = function () {
			 
			region.length = 1; // Option entfernen
			land.length = 1; 
			stadt.length = 1; 
			 
			 if (this.selectedIndex < 1)
				 return; 
			 
			 for (var reg in arrKontinente[this.value]) {
				region.options[region.options.length] = new Option(reg, reg);
			 }
		}
		
		//region ändert
		region.onchange = function () {		 
			 
			land.length = 1; // Option entfernen
			stadt.length = 1; 
			 
			 if (this.selectedIndex < 1)
				 return; 
			 
			 for (var lan in arrKontinente[kontinent.value][this.value]) {
				land.options[land.options.length] = new Option(lan, lan);
			 }
		}
		
		//land ändert sich
		land.onchange = function () {
			stadt.length = 1; // Option entfernen
			
			if (this.selectedIndex < 1)
				return; 
			
			var sta = arrKontinente[kontinent.value][region.value][this.value];
			for (var i = 0; i < sta.length; i++) {
				stadt.options[stadt.options.length] = new Option(sta[i], sta[i]);
			}
		}	

		//stadt ändert sich
		stadt.onchange = function () {
			
			if (this.selectedIndex < 1)
				return; 
			
			var staInfo = arrKontinente[kontinent.value][region.value][land.value][this.value];
			
		}	
	}
	

})();