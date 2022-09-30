//on recupere les id de tous les input avec lesquelles on va travailler
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
let prix_u = document.getElementById('prix_u');
let prix = document.getElementById('prix');
let fees = document.getElementById('fees');
let prix_t = document.getElementById('prix_total');


$(document).ready(function(){
    $('.cacher').hide(); //on cache les inputs quand la page est chargee

    select.addEventListener("change", function() { 
        $('.cacher').hide();
        nb_elev.value = "";//on remet le nb d'ascenseur calculé à nul
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
        //affichage des services standards, premium et excellium et des calculs correspondants
        [standard, premium, excellium, cage, flor, apt, ocup, base].forEach(function(element) {
            element.addEventListener("change", function() {
                let x = document.querySelector("input[type=radio]:checked").value;
                let resultat=0, a=0, b=0, c=0;
                if (x === "standard") {
                    a = 7565;
                    b = (nb_elev.value*7565).toFixed(2);
                    c = (b*0.10).toFixed(2);
                    resultat = (b*1.10).toFixed(2);
                }
                if (x === "premium") {
                    a = 12345;
                    b = (nb_elev.value*12345).toFixed(2);
                    c = (b*0.13).toFixed(2);
                    resultat = (b*1.13).toFixed(2);
                } 
                if (x === "excellium") {
                    a = 15400;
                    b = (nb_elev.value*a).toFixed(2);
                    c = (b*0.16).toFixed(2);  
                    resultat = (b*1.16).toFixed(2);                
                }
                prix_u.value = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$";
                prix.value = b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$";
                fees.value = c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$";
                prix_t.value = resultat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+"$";
            })
        })
    })
});   

