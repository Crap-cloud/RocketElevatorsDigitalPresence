let select = document.querySelector('select');
let nb_elev = document.getElementById('elev');
let cage = document.getElementById('cage');
let apt = document.getElementById('apt');
let flor = document.getElementById('flor');
let ocup = document.getElementById('ocup');
let base = document.getElementById('base');
let standard = document.getElementById('standard');
let premium = document.getElementById('premium');
let excellium = document.getElementById('excellium');
let prix_t = document.getElementById('prix_total');


$(document).ready(function(){
    $('.cacher').hide(); //on cache les inputs quand la page est chargee

    select.addEventListener("change", function() { 
        $('.cacher').hide();
        nb_elev.value = "";
        //on affiche les inputs correspondant a l'option selectionnee
        for(let i=0;i<select.options.length;i++) {
            if (select.options[i].selected === true) {
                let voir = $(this).find('option:selected').attr('data-id');
                $(voir).show();
            }
        }
        //calcule nb ascenseur commercial
        if (select.options[2].selected === true) { 
            cage.addEventListener("change", function() {
                nb_elev.value = cage.value;
            })
        }
        //calcule nb ascenseur residential
        if (select.options[1].selected === true) { 
            [apt, flor].forEach(function(element) {
                element.addEventListener("change", function() {
                    nb_elev.value = Math.floor(apt.value / 6)*(Math.floor(flor.value/20)+1);
                })
            })
        }
        //calcule nb ascenseur corporate ou hybrid
        if (select.options[3].selected === true || select.options[4].selected === true) { 
            [ocup, flor, base].forEach(function(element) {
                element.addEventListener("change", function() {
                    nb_elev.value = Math.floor(Math.floor(ocup.value*flor.value)/1000)*(Math.floor((parseInt(flor.value)+parseInt(base.value))/20)+1);
                })
            })
        }
        //affichage des services standards, premium et excellium
        [standard, premium, excellium].forEach(function(element) {
            element.addEventListener("change", function() {
                let x = document.querySelector("input[type=radio]:checked").value;
                if (x === "standard") {
                    prix_t.value = nb_elev.value*7.565*1.10;
                }
                if (x === "premium") {
                    prix_t.value = nb_elev.value*12.345*1.13;
                } 
                if (x === "excellium") {
                    prix_t.value = nb_elev.value*15.400*1.16;                
                }       
            })
        })
    })
});   

