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
                    let apt_flor = Math.ceil(apt.value/flor.value/6);
                    let col = Math.ceil(flor.value/20);
                    nb_elev.value = apt_flor*col;
                })
            })
        }
        //calcule nb ascenseur corporate ou hybrid
        if (select.options[3].selected === true || select.options[4].selected === true) { 
            [ocup, flor, base].forEach(function(element) {
                element.addEventListener("change", function() {
                    let elev_req = Math.ceil(Math.ceil(ocup.value*(parseInt(flor.value)+parseInt(base.value)))/1000);
                    let column = Math.ceil((parseInt(flor.value)+parseInt(base.value))/20);
                    let elev_column = Math.ceil(elev_req / column);
                    nb_elev.value = elev_column*column;
                })
            })
        }
        //affichage des services standards, premium et excellium
        [standard, premium, excellium, cage, flor, apt, ocup, base].forEach(function(element) {
            element.addEventListener("change", function() {
                let x = document.querySelector("input[type=radio]:checked").value;
                let resultat = 0;
                if (x === "standard") {
                    resultat = nb_elev.value*7565*1.10;
                }
                if (x === "premium") {
                    resultat = nb_elev.value*12345*1.13;
                } 
                if (x === "excellium") {
                    resultat = nb_elev.value*15400*1.16;                
                }
                prix_t.value = resultat.toFixed(2);    
            })
        })
    })
});   

