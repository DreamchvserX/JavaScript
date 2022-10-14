/* 
	Die Kontinente sind als Konstante hinterlegt, 
	so dass Sie für das erste Select-Feld keine 
	Daten vom Server abrufen müssen.
  	Folgende Kontinente haben keine Regionen:
		["Antarctica", "South America"]
 */
        (()=>{
            "use strict";

            const arrKontinente = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Antarctica"];
            
            //Variablen deklarieren
            const kontinent = document.getElementById("kontinent");
            const region = document.getElementById("region");	
		    const land = document.getElementById("land");
		    const stadt = document.getElementById("stadt");

            
            
            //KONTINENT array aufrufen
            for(var i = 0; i < arrKontinente.length; i++) {
                var opt = arrKontinente[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                kontinent.appendChild(el);
            }
        
            //kontinent ändertt sich (region dependent)
            const ladeKontinent = (evt) => {

                document.getElementById('kontinent').onchange = function() {
                    var options = document.querySelectorAll('#region option');
                    options.forEach(o => o.remove());
                }

                console.log("ladeKontinent", evt.target.value)
                fetch('data/liste-json.php?liste=regionen&suche=' + evt.target.value)
                .then((response) => {return response.json();})
                //.then((data) => {data.Daten.forEach((obj) => {console.log(obj.Region)})})
                .then((data) => {data.Daten.forEach((obj) => {if(data.Daten.length >= 1){

                    //option-Element erstellen - createElement
                    let objNodeLi = document.createElement("option");
                    //Textknoten erstellen mit Wert von Region - createTextNode
                    let objNodeTxt = document.createTextNode(obj.Region);
                    //Textknoten an option anhängen - appendChild
                    objNodeLi.appendChild(objNodeTxt);
                    region.append(objNodeLi);
                    //option-Element an liste region anhängen - appendChild
                    //document.getElementById('region').appendChild(objNodeLi);
                    };
                
                })})                         
                                                        
            }
            kontinent.addEventListener("change", ladeKontinent);
                       

                //region ändert sich (land dependent)
                const ladeLaender = (evt) => {
                    document.getElementById('region').onchange = function() {
                        var options = document.querySelectorAll("#land option");
                        options.forEach(o => o.remove());
                    }
                    //console.log("ladeKontinent", evt.target.value)
                    fetch('data/liste-json.php?liste=laender&suche=' + evt.target.value)
                    .then((response) => { return response.json();})
                    .then((data) => {data.Daten.forEach((obj) => {
                        if(data.Daten.length >= 1){
                            let objLandLi = document.createElement("option");
                            let objLandTxt = document.createTextNode(obj.Land);
        
                            objLandLi.appendChild(objLandTxt);
                            land.append(objLandLi);
                            };
                    })})
                }
                region.addEventListener("change", ladeLaender);
        

                //Landesinfo ausgeben (stadt dependent)
                const ladeStaedte = (evt) => {
                    document.getElementById('land').onchange = function() {
                        var options = document.querySelectorAll("#stadt option");
                        options.forEach(o => o.remove());
                    }
                    //console.log("ladeKontinent", evt.target.value)
                    fetch('data/liste-json.php?liste=staedte&suche=' + evt.target.value)
                    .then((response) => { return response.json();})
                    .then((data) => {data.Daten.forEach((obj) => {
                        if(data.Daten.length >= 1){
                            let objStadtLi = document.createElement("option");
                            let objStadtTxt = document.createTextNode(obj.Name);
        
                            objStadtLi.appendChild(objStadtTxt);
                            stadt.append(objStadtLi);
                            };
                    })}) 
                }
                land.addEventListener("change", ladeStaedte);

        })();
        