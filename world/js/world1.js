/* 
	Die Kontinente sind als Konstante hinterlegt, 
	so dass Sie für das erste Select-Feld keine 
	Daten vom Server abrufen müssen.
  	Folgende Kontinente haben keine Regionen:
		["Antarctica", "South America"]
 */
(()=>{
	"use strict";
	
	window.onload = populateSelect();

    function populateSelect() {
       
        var xhr = new XMLHttpRequest(), 
            method = 'GET',
            overrideMimeType = 'application/json',
            url = './world.json';       

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                
            
                let kontinente = JSON.parse(xhr.responseText);

                let ele = document.getElementById('kontinent');
                for (let i = 0; i < kontinente.length; i++) {
                  
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + kontinente[i].ID + '">' + kontinente[i].Name + '</option>';
                }
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    }

    function show(ele) {
       
        var msg = document.getElementById('msg');
        msg.innerHTML = 'Ausgewählter kontinent: <b>' + ele.options[ele.selectedIndex].text + '</b> </br>' +
            'ID: <b>' + ele.value + '</b>';
    }

})();