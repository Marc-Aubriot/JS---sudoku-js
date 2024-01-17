/* ================================================= TO DO LIST ============================================ 
 1 - créer une grille parfaite - OK
 A - créer dynamique chaque grille (chaque sous grille, colonne et ligne) - OK
 B - mettre chaque case de la grille à 0, et remplir chaque sousgrille/row/column avec les possibilités - OK
 C - remplir chaque case de la grille, et enlever chaque possiblité de sousgrille/row/column au fur à mesure - OK

 2 - imprimer la grille sur écran - OK
 A - target les elements html et dispatcher la grille dans 9 sous grille - OK
 B - imprimer les 9 sous grille dans les 9 div qui ont étées target - OK

 3 - cacher des cases en fonction de la difficulté - OK
 A - selection du niveau de difficulté - OK
 B - génération aléatoire des cases à masquer - OK

 4 - pouvoir remplir les trous pour jouer - OK
 A - pouvoir mettre uniquement des chiffres dans les cases vides - OK
 B - pouvoir mettre uniquement qu'un seul chiffre dans les cases vides - OK

 5 - vérifier la grille et déclarer la victoire -OK
 A - construire une fonction checker si la grille est bonne - OK
 B - assigné un event input à la grille  qui lance la fonction ? - OK
 C - display la victoire d'une manière ou d'une autre - OK

 6 - ajout de fonctionnalité ?
 A - quand on met un chiffre, la case passe au vert si c'est 'bon' et rouge si chiffre deja présent (aide visuelle) - ABANDONNER car sans réel intérêt
 B - pouvoir noter nos idées de chiffres sur les côtés de la case pour aide à la réflexion
 C - un bouton viderleplateau, un bouton aide si on est bloqué - OK, deuxieme ABANDONNER
 D - un timer et un systeme de point  - ABANDONNER car sans réel intérêt
 E - deux boutons fléchés qui permettent de revenir en arrière par exemple si j'ai mis 2 3 4 et 5 je peux revenir à 2, ou ensuite re-revenir à 5 si j'ai envie - ABANDONNER car sans réel intérêt
 F - un selecteur de theme (photo de fond ? , banquise, plage, jungle (foret ?), montagne) - OK
============================================================================================================ */


// 0 - Main JS =======================================================================================================================================================
var gameOn = false; //le jeu est OFF

const launchGameBtn =  document.getElementById('launchGameBtn'); //bouton qui démarre le jeu
launchGameBtn.addEventListener('click', function() { grilleCreation(); });


// 1 - Génération de la grille, on génère chaque chiffre possible dans chaque case ===================================================================================
/*  A - créer dynamique chaque grille (chaque sous grille, colonne et ligne) - OK
    B - mettre chaque case de la grille à 0, et remplir chaque sousgrille/row/column avec les possibilités - OK
    C - remplir chaque case de la grille, et enlever chaque possiblité de sousgrille/row/column au fur à mesure - OK
*/
var grille = []; //va nous servir à piocher les nombres
var colonnes = []; //pour check les colonnes
var lignes = []; //pour check les lignes
var sousGrille = []; //pour check les sous grilles
var grille_complete  = false;
var i_while = 0; //compte les loop
var nb_max_loop = 2; //nbr max de loop

function grilleCreation() { // on va créer le plateau en array, la fonction est pas de moi mais je l'ai un peu modifiée ci et là

    if (grille_complete) { viderLePlateau(); }

    Start:
    while (( i_while < nb_max_loop ) && !grille_complete) {

        for (i=1; i<=9; i++) { //créer 9 cases dans grille, lignes, colonnes et sousGrille
            grille[i] = new Array();
            colonnes[i] = new Array();
            lignes[i] = new Array();

            for (j=1; j<=9; j++) { //créer 9 cases dans grilles (soit 81 possibilités) et rempli les cases avec les possibilités
                grille[i][j] = new Array();
                colonnes[i][j] = j;
                lignes[i][j] = j;

                for (k=1; k<=9; k++) { //met les  81  possiblités à 0
                    grille[i][j][k] = 0;
                }
            }
        }

        for (i=1; i<=3; i++) { //on créé les 3 lignes des subgrids
            sousGrille[i] = new Array();

            for (j=1; j<=3; j++) { //on créé les 3 colonnes des subgrids
                sousGrille[i][j] = new Array();

                for (k=1; k<=9; k++) { //on créé les 9 possibilités dans les 9 case de chaque subgrids
                    sousGrille[i][j][k] = k;
                }
            }
        }

        for (y=1; y<=9; y++) {  //remplissage de grille 
            for (x=1; x<=9; x++) {
                var possible = new Array();
                var index = 0;

                for (z=1; z<=9; z++) { //check si le chiffre Z est absent de lignes/colonnes/sousGrille, place Z dans possible
                    if (!lignes[y][z]) continue;
                    if (!colonnes[x][z]) continue;
                    if (!sousGrille[Math.ceil(y/3)][Math.ceil(x/3)][z]) continue;

                    possible[index] = z;
                    index++;
                }

                if (possible.length == 0) continue Start; //si aucun chiffre dans possible retourne au début

                var num = possible[Math.floor((Math.random() * possible.length))];
                grille[x][y] = num;
                lignes[y][num] = undefined;
                colonnes[x][num] = undefined;
                sousGrille[Math.ceil(y/3)][Math.ceil(x/3)][num] = undefined;
            }
        }

        grille_complete = true;
        grilleDisplay();
    }
}

var grille_display = [[], [], [], [], [], [], [], [], [], []];


// 2 - imprimer la grille sur écran ==================================================================================================================================
/*  A - target les elements html et dispatcher la grille dans 9 sous grille - OK
    B - imprimer les 9 sous grille dans les 9 div qui ont étées target - OK
*/
const subG1 = document.getElementById('subG1'); // subgrid dans le html
const subG2 = document.getElementById('subG2');
const subG3 = document.getElementById('subG3');
const subG4 = document.getElementById('subG4');
const subG5 = document.getElementById('subG5');
const subG6 = document.getElementById('subG6');
const subG7 = document.getElementById('subG7');
const subG8 = document.getElementById('subG8');
const subG9 = document.getElementById('subG9');

const correctionMainGrid = document.getElementById('correctionMainGrid'); // grid de correction dans le html
correctionMainGrid.style.visibility = 'hidden';

const correctionBtn =  document.getElementById('correctionBtn'); //bouton qui affiche la solution
correctionBtn.onclick= function() { correctionMainGrid.style.visibility = 'visible'; } ;

const correctionSubG1 = document.getElementById('correctionSubG1'); // subgrid de correction dans le html
const correctionSubG2 = document.getElementById('correctionSubG2');
const correctionSubG3 = document.getElementById('correctionSubG3');
const correctionSubG4 = document.getElementById('correctionSubG4');
const correctionSubG5 = document.getElementById('correctionSubG5');
const correctionSubG6 = document.getElementById('correctionSubG6');
const correctionSubG7 = document.getElementById('correctionSubG7');
const correctionSubG8 = document.getElementById('correctionSubG8');
const correctionSubG9 = document.getElementById('correctionSubG9');

var grille_solution = []; //stock la grille finie
function grilleDisplay() { //créer la grille dans le html

    for (i=1; i<=9; i++) { //récupère la grille complète et l'injecte dans les sous grille

        for (j=1; j<=9; j++) { 
            
            if (j>=1 && j<4 && i>=1 && i<4) { grille_display[1].push(grille[i][j]); } //bloc1
            if (j>=4 && j<7 && i>=1 && i<4) { grille_display[2].push(grille[i][j]); } //bloc2
            if (j>=7 && j<=9 && i>=1 && i<4) { grille_display[3].push(grille[i][j]); } //bloc3

            if (j>=1 && j<4 && i>=4 && i<7) { grille_display[4].push(grille[i][j]); } //bloc4
            if (j>=4 && j<7 && i>=4 && i<7) { grille_display[5].push(grille[i][j]); } //bloc5
            if (j>=7 && j<=9 && i>=4 && i<7) { grille_display[6].push(grille[i][j]); } //bloc6

            if (j>=1 && j<4 && i>=7 && i<=9) { grille_display[7].push(grille[i][j]); } //bloc7
            if (j>=4 && j<7 && i>=7 && i<=9) { grille_display[8].push(grille[i][j]); } //bloc8
            if (j>=7 && j<=9 && i>=7 && i<=9) { grille_display[9].push(grille[i][j]); } //bloc9
        }
    }

    for (i=1; i<=9; i++) { //display la grille complète de correction
        for (j=0; j<9; j++) {
            const para = document.createElement('p');
            para.textContent = `${grille_display[i][j]}`;

            if (i==1) { correctionSubG1.appendChild(para); } //bloc1
            if (i==2) { correctionSubG2.appendChild(para); } //bloc2
            if (i==3) { correctionSubG3.appendChild(para); } //bloc3

            if (i==4) { correctionSubG4.appendChild(para); } //bloc4
            if (i==5) { correctionSubG5.appendChild(para); } //bloc5
            if (i==6) { correctionSubG6.appendChild(para); } //bloc6

            if (i==7) { correctionSubG7.appendChild(para); } //bloc7
            if (i==8) { correctionSubG8.appendChild(para); } //bloc8
            if (i==9) { correctionSubG9.appendChild(para); } //bloc9
        }
    }

    grille_solution = grille_display.slice(); //enregistre la solution
    
    var diff = niveau.value;
    nb_case_cachee = diff;

    hacheCase(); //appelle la fonction qui hache la grille complète et restitue une grille à trou

    var loop_count = 0; //sert à donner le numero de case en id a chaque case 1 => 81
    for (i=0; i<9; i++) { //display la grille de jeu à finir
        for (j=0; j<9; j++) {
            loop_count++;
            const para = document.createElement('p');
            para.textContent = `${grille_display[i][j]}`;
            para.setAttribute('id',`cell-${loop_count}`);
            para.setAttribute('class',`sudoku_cell`);

            if ( grille_display[i][j] === '' ) { //permet d'éditer les cases vides
                para.contentEditable = "true";  
                para.setAttribute('class',`sudoku_cell-hidden`);
            }

            if (i==0) { subG1.appendChild(para); } //bloc1
            if (i==1) { subG2.appendChild(para); } //bloc2
            if (i==2) { subG3.appendChild(para); } //bloc3

            if (i==3) { subG4.appendChild(para); } //bloc4
            if (i==4) { subG5.appendChild(para); } //bloc5
            if (i==5) { subG6.appendChild(para); } //bloc6

            if (i==6) { subG7.appendChild(para); } //bloc7
            if (i==7) { subG8.appendChild(para); } //bloc8
            if (i==8) { subG9.appendChild(para); } //bloc9
        }
    }
    
    if ( themeOn == 1 ) { //applique le thème
        themeChanger('clair');
    } else if ( themeOn == 2 ) {
        themeChanger('obscur');
    } else if ( themeOn == 3 ) {
        themeChanger('jungle');
    }
}


// 3 - cacher des cases en fonction de la difficulté =================================================================================================================
/*  A - selection du niveau de difficulté - OK
    B - génération aléatoire des cases à masquer - OK
*/
var niveau = document.getElementById('difficultySelecter');
var nb_case_cachee = 25; //difficulté normale par défaut

function hacheCase() { // fonction qui hache la grille complète et restitue une grille à trou
    var tempArray = []; //stock la grille de transition grille_display complète > grille_display hachée
    for (i=1; i<=9; i++) { //découpe la grille dans 1 array temporaire de 81 position
        for (j=0; j<9; j++) {
            tempArray.push(grille_display[i][j]);
        }
    }

    var nb_case_cacheeLoop = nb_case_cachee; //pour compter les loops en fonction du nombre de case cachées
    var rdmCaseVideChecker = []; //stock les chiffres hachés pour comparer et refaire la boucle
    while (nb_case_cacheeLoop>=1) { //créer des positions vide en fonction de la difficulté dans l'array temporaire

        let rdmCaseVide = Math.round((Math.random() * 81 ));
    
        if (rdmCaseVideChecker.includes(rdmCaseVide)) { continue; };
        rdmCaseVideChecker.push(rdmCaseVide);
        
        tempArray.splice(rdmCaseVide, 1, '');

        if ( nb_case_cacheeLoop == 1 ) { tempArray.splice(Math.round((Math.random() * 9 )), 1, ''); } //target spécifiquement chaque subgrid pour avoir 
        if ( nb_case_cacheeLoop == 2 ) { tempArray.splice(Math.round((Math.random() * 9+9 )), 1, ''); } // un hachage plus réparti
        if ( nb_case_cacheeLoop == 3 ) { tempArray.splice(Math.round((Math.random() * 9+18 )), 1, ''); }
        if ( nb_case_cacheeLoop == 4 ) { tempArray.splice(Math.round((Math.random() * 9+27 )), 1, ''); }
        if ( nb_case_cacheeLoop == 5 ) { tempArray.splice(Math.round((Math.random() * 9+36 )), 1, ''); }
        if ( nb_case_cacheeLoop == 6 ) { tempArray.splice(Math.round((Math.random() * 9+45 )), 1, ''); }
        if ( nb_case_cacheeLoop == 7 ) { tempArray.splice(Math.round((Math.random() * 9+54 )), 1, ''); }
        if ( nb_case_cacheeLoop == 8 ) { tempArray.splice(Math.round((Math.random() * 9+63 )), 1, ''); }
        if ( nb_case_cacheeLoop == 9 ) { tempArray.splice(Math.round((Math.random() * 9+72 )), 1, ''); }
        
        nb_case_cacheeLoop--;
    }

    grille_display.splice(0,grille_display.length); //vide la grille
    for (i=0; i<9; i++) { //récupère l'array temporaire hacher et l'injecte dans la grille display

        grille_display.push(tempArray.splice(0*i,9));
        
    }
}


// 4 - pouvoir remplir les trous pour jouer ==========================================================================================================================
/*  A - pouvoir mettre uniquement des chiffres dans les cases vides - OK
    B - pouvoir mettre uniquement qu'un seul chiffre dans les cases vides - OK
*/
const mainGrid = document.getElementById('mainGrid'); //Grille de jeu dans le html

const allowedKeys = ['Backspace','Tab','Escape','Enter','1','2','3','4','5','6','7','8','9','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Delete']

mainGrid.addEventListener('keydown', async (e) => { //n'autorise que les chiffres dans la grille
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
        return false;
    } 
});

mainGrid.addEventListener('input', function() { //n'autorise pas plus d'un chiffre dans la grille
    if ( document.getElementById(event.target.id).innerText.length > 1 ) { 
        document.getElementById(event.target.id).innerText = '';
    } 
});


// 5 - vérifier la grille et déclarer la victoire ====================================================================================================================
/*  A - construire une fonction checker si la grille est bonne - OK
    B - assigné un event input à la grille qui lance la fonction - Ok
    C - display la victoire d'une manière ou d'une autre - OK
*/

function winCheck() { //check si la grille est complète, et si elle est égale à la grille de solution
    /*
    a - on récupère le contenu des éléments P en utilisant l'id pour former un array contenant les 81 chiffres
    b - on créer deux array temporaire qu'on va transformer en string et comparer
    c - si les deux string sont identique alors la grille est complète, sinon la grille est fausse
    */

    var loopNumber = 1;
    var checkArray = [];
    while ( loopNumber <= 81 ) {  // récupère le contenu des cases et l'injecte dans checkArray
        checkArray.push(document.getElementById(`cell-${loopNumber}`).textContent);
        loopNumber++;
    }

    var tempGrille_Solution = (grille_solution.slice()).toString(); //transforme l'array en string 
    tempGrille_Solution = tempGrille_Solution.slice(1, tempGrille_Solution.length); //index[0] vient fausser le string, donc on enlève le premier caracter

    var tempCheckArray = (checkArray.slice()).toString();

    if ( tempCheckArray === tempGrille_Solution ) { 
        console.log('VICTOIRE');
        createBalloons(100);
    } else { 
        console.log('INCOMPLETE'); 
    }
}

function random(num) {
    return Math.floor(Math.random()*num)
}
  
function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5)+5;
    return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r-10},${g-10},${b-10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite;
    `;
}
  
function createBalloons(num) {
    const main = document.querySelector('main');
    const container =  document.createElement('div');
    container.setAttribute('id', 'balloon-container');
    main.appendChild(container);
    var balloonContainer = document.getElementById("balloon-container")

    setTimeout(function(){
        document.getElementById("balloon-container").remove();
    }, 10000); 

    for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
    balloon.addEventListener('mouseover', function() { this.remove(); })
    }
}
  

mainGrid.addEventListener('input', function() { winCheck(); }); //a chaque case remplie, appelle la fonction qui va vérifier si la grille est complète

// 6 - ajout de fonctionnalité ? =====================================================================================================================================
/*  A - quand on met un chiffre, la case passe au vert si c'est 'bon' et rouge si chiffre deja présent (aide visuelle) - ABANDONNER car sans réel intérêt
    B - pouvoir noter nos idées de chiffres sur les côtés de la case pour aide à la réflexion 
    C - un bouton viderleplateau, un bouton aide si on est bloqué - OK, deuxieme ABANDONNER car sans réel intérêt
    D - un timer et un systeme de point - ABANDONNER car sans réel intérêt
    E - deux boutons fléchés qui permettent de revenir en arrière par exemple si j'ai mis 2 3 4 et 5 je peux revenir à 2, ou ensuite re-revenir à 5 si j'ai envie - ABANDONNER car sans réel intérêt
    F - un selecteur de theme (photo de fond ? , banquise, plage, jungle (foret ?), montagne) - OK
*/

// C - Vider le plateau
function viderLePlateau() { //vide le plateau et remet toutes les variables à l'état initial

    subG1.innerHTML = ''; //vide le plateau
    subG2.innerHTML = '';
    subG3.innerHTML = '';
    subG4.innerHTML = '';
    subG5.innerHTML = '';
    subG6.innerHTML = '';
    subG7.innerHTML = '';
    subG8.innerHTML = '';
    subG9.innerHTML = '';

    correctionSubG1.innerHTML = ''; //vide le plateau de correction
    correctionSubG2.innerHTML = '';
    correctionSubG3.innerHTML = '';
    correctionSubG4.innerHTML = '';
    correctionSubG5.innerHTML = '';
    correctionSubG6.innerHTML = '';
    correctionSubG7.innerHTML = '';
    correctionSubG8.innerHTML = '';
    correctionSubG9.innerHTML = '';

    grille = []; //va nous servir à piocher les nombres
    colonnes = []; //pour check les colonnes
    lignes = []; //pour check les lignes
    sousGrille = []; //pour check les sous grilles
    grille_complete  = false;
    i_while = 0; //compte les loop
    nb_max_loop = 2; //nbr max de loop
    grille_display = [[], [], [], [], [], [], [], [], [], []];
    grille_solution = []; //stock la grille finie
    niveau = document.getElementById('difficultySelecter');
    nb_case_cachee = niveau; 
    correctionMainGrid.style.visibility = 'hidden';
}

// F - un selecteur de theme (photo de fond ? , banquise, plage, jungle (foret ?), montagne)
var themeOn = 1; //thème par défaut

function themeChanger(theme) {

    const body = document.querySelector('body');
    const main = document.querySelector('main');

    if ( theme == 'clair' ) {
        body.style.backgroundColor = 'rgb(224, 218, 218)';
        body.style.backgroundImage = 'url(images/sable-plage.jpg)';
        body.style.backgroundColor = 'rgb(22, 19, 19)';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repreat';
        body.style.backgroundSize = 'cover';
        //body.style.backgroundImage = 'none';
        
        //main.style.backgroundColor = 'beige';
        mainGrid.style.backgroundColor= 'rgba(255, 235, 205, 0.8)';
        correctionMainGrid.style.backgroundColor= 'rgba(255, 235, 205, 0.8)';

        document.querySelectorAll('.sudoku_cell').forEach(e => e.style.color = "black");
        document.querySelectorAll('.sudoku_cell-hidden').forEach(e => e.style.color = "blue");
        
        document.getElementById('difficultySelecter').removeAttribute('class', 'jungle');
        document.getElementById('launchGameBtn').removeAttribute('class', 'jungle');
        document.getElementById('correctionBtn').removeAttribute('class', 'jungle');
        document.getElementById('difficultySelecter').removeAttribute('class', 'jungle');
        document.getElementById('launchGameBtn').removeAttribute('class', 'obscur');
        document.getElementById('correctionBtn').removeAttribute('class', 'obscur');

        themeOn = 1;

    } else if ( theme == 'obscur' ) {
        //body.style.backgroundImage = 'none';
        body.style.backgroundColor = 'rgb(22, 19, 19)';
        body.style.backgroundImage = 'url(images/space.webp)';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repreat';
        body.style.backgroundSize = 'cover';
        //main.style.backgroundColor = 'rgb(54, 52, 52)';
        mainGrid.style.backgroundColor= 'rgba(110, 107, 101, 0.9)';
        correctionMainGrid.style.backgroundColor= 'rgba(110, 107, 101, 0.9)';

        document.querySelectorAll('.sudoku_cell').forEach(e => e.style.color = "white");
        document.querySelectorAll('.sudoku_cell-hidden').forEach(e => e.style.color = "black");

        document.getElementById('difficultySelecter').setAttribute('class', 'obscur');
        document.getElementById('launchGameBtn').setAttribute('class', 'obscur');
        document.getElementById('correctionBtn').setAttribute('class', 'obscur');

        themeOn = 2;

    } else if ( theme == 'jungle' ) {

        body.style.backgroundImage = 'url(images/jungle.webp)';
        body.style.backgroundColor = 'rgb(22, 19, 19)';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repreat';
        body.style.backgroundSize = 'cover';
        //main.style.backgroundColor = 'rgba(0, 105, 0, 0.5)';
        mainGrid.style.backgroundColor= 'rgba(1, 77, 1, 0.75)';
        correctionMainGrid.style.backgroundColor= 'rgba(1, 77, 1, 0.75)';
        
        document.querySelectorAll('.sudoku_cell').forEach(e => e.style.color = "white");
        document.querySelectorAll('.sudoku_cell-hidden').forEach(e => e.style.color = "rgb(40, 235, 33)");

        document.getElementById('difficultySelecter').setAttribute('class', 'jungle');
        document.getElementById('launchGameBtn').setAttribute('class', 'jungle');
        document.getElementById('correctionBtn').setAttribute('class', 'jungle');

        themeOn = 3;
    }
}

// 7 - création dun site espace de jeu sympa, fond avec des arbres, design moderne etc un peu voyage, sudoku au bord de la plage ? ===================================