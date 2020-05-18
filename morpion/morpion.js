
var firstInit = true;
//statement est un tableau séparant la grille en sous tableaux.
//Chaques lignes, colonnes et diagonales correspondent à des sous tableaux.
//Ce tableau va ainsi stocker l'état des cases de toutes les lignes, colonnes et diagonales
//étant plus pratique pour mettre en place la stratégie de l'ordi et permettant d'utiliser facilement
//des relations lignes, colonnes et diagonales
var statement = [];
//sources a la même structure que statement sauf qu'à chaque case est attribuée l'image correspondante
//dans la grille permettant ainsi de placer facilement les croix et le ronds dans la grille
var sources = [];
var endGame = false; //vérifie si le jeu est fini où non
var equality=0;
var chem = "http://tovuti.polytech.unice.fr/~bl710160/adw/images/undefined.png";

//fonction appelée au moment du clic par le joueur sur l'une des cases
//qui va placer la croix ou le joueur a joué puis va appeler la fonction
//faisant jouer l'ordi puis ensuite vérifie si le jeu n'est pas terminé
//c'est à dire si l,'ordi ou le joueur a complété une ligne ou si toutes
//les cases sont occupées
function click_image(n){
  var size = Number(document.getElementById("size").innerHTML);
  var img = document.querySelectorAll("img");

  if(endGame==false){ //permet de jouer uniquement tant que le jeu n'est pas fini
    if(img[n].src == chem){ //le joueur peut placer ses croix que dans les cases vides
      equality+=1;
      img[n].src = "images/croix.png";
      statement[parseInt(n/size)][n%size]="player";                                 //place "player" dans statement
      statement[size+(n%size)][parseInt(n/size)]="player";                          //à la fois dans les lignes,
      if(n%(size+1)==0) statement[statement.length-2][n%size]="player";             // colonnes et diagonales pour
      else if(n%(size-1)==0) statement[statement.length-1][(n/(size-1)-1)]="player";//que l'ordi puisse appliqué sa stratégie
      if(n==((size**2)-1)/2 && size%2!=0){
        statement[statement.length-2][parseInt(size/2)]="player";
        statement[statement.length-1][parseInt(size/2)]="player";
      }
      if(isEnded(statement,Number(document.getElementById("size").innerHTML))){   //vérifie si quand le joueur vient de jouer la partie est terminée ou pas
        alert("Bravo vous avez gagné!");
        endGame=true;
        document.getElementById('replay').style.visibility = "visible";  //rend visible le bouton Rejouer
        return;
      } else {
        ordi(statement,size);  //lance la fonction faisant jouer l'ordi
        equality+=1;
        if(isEnded(statement,Number(document.getElementById("size").innerHTML))){
          alert("Dommage vous avez perdu...");
          endGame=true;
          document.getElementById('replay').style.visibility = "visible";
          return;
        }
      }
      var testFull;//variable dépendant de la parité de la taille de la grille permettant de vérifier si la grille est pleine
      if(size%2==0) testFull = size**2;
      else testFull = size**2+1;
      if(equality==testFull){ //vérifie si le nombre de coup joué est égale à testFull
        alert("Match nul!");
        endGame=true;
        document.getElementById('replay').style.visibility = "visible";
      }
    }
  }
}

function ordi(statement,size){
  var n;
  for(var i=1;i<size;i++){  //boucle permettant de parcourir statement
    play = findOccurOrdi(statement,size-i); //voir utilité findOccurOrdi au niveau de sa déclaration
    if(play>=0){  //vérifie si findOccurOrdi a retourné un index de statement correspondant à une ligne, colonne ou diagonale de la grille
      for(var j=0; j<statement[play].length;j++){

        if(statement[play][j]=="empty"){    //vérifie dans la grille est vide
          if(play<size){    //vérifie si l'index stocké dans play correspond à une ligne de la grille
            n=play*size+j;  //numéro de case dans la grille ex n=2 si play=0, la taille de la grille est 3 et si la première case vide est la dernière de la ligne (case en haut à droite de la grille de 3x3)
            statement[play][j]="ordi";//ligne                                         //place "ordi" dans statement dans la ligne au premier index vide
            sources[play][j].src="images/cercle.png";                                 // et par relation entre les les lignes colonnes et diagonales
            statement[j+size][play]="ordi"; //colonne                                  //place "ordi" également dans les tableaux correspondant aux colonnes
            sources[j+size][play].src="images/cercle.png";                             //et aux diagonales (même types de relations pour les blocs conditionnels qui suivent)
            if(n%(size+1)==0){
               statement[statement.length-2][j]="ordi"; //1ère diagonale
               if(n==(((size**2))-1)/2) statement[statement.length-1][size-j-1]="ordi";//2ème diagonale
            } else if(n%(size-1)==0){
              statement[statement.length-1][size-j-1]="ordi";//2ème diagonale
            }
          } else if(play>=size && play<size*2){ //vérifie si l'index stocké dans play correspond à une colonne de la grille
            n=(play-size)+(j*size);
            statement[play][j]="ordi"; //colonne
            sources[play][j].src="images/cercle.png"; //ligne
            statement[j][play-size]="ordi";
            if(n%(size+1)==0){
               statement[statement.length-2][j]="ordi"; //1ère diagonale
               if(n==(((size**2))-1)/2) statement[statement.length-1][j]="ordi"; //2ème diagonale
            } else if(n%(size-1)==0){
              statement[statement.length-1][j]="ordi"; //2ème diagonale
            }
          } else if(play==size*2){ //vérifie si l'index stocké dans play correspond à la première diagonale de la grille
            n=(size+1)*j;
            statement[play][j]="ordi"; //1ère diagonale
            sources[play][j].src="images/cercle.png";
            statement[parseInt(n/size)][n%size]="ordi"; //ligne
            statement[size+(n%size)][parseInt(n/size)]="ordi"; //colonne
            if(size%2!=0 && j==parseInt(size/2)) statement[statement.length-1][j]="ordi"; //2ème diagonale
          } else {  //la dernière possibilité est que play stocke l'index de la 2ème diagonale
            n=(size-1)*(j+1);
            statement[play][j]="ordi"; //2ème diagonale
            sources[play][j].src="images/cercle.png";
            statement[parseInt(n/size)][n%size]="ordi"; //ligne
            statement[size+(n%size)][parseInt(n/size)]="ordi"; //colonne
            if(size%2!=0 && j==parseInt(size/2)) statement[statement.length-2][j]="ordi"; //1ère diagonale
          }
          return;
        }

      }
    }
  }
}

//fonction qui va trouver l'index d'un tableau où l'ordi a placé n ronds et le joueur n'a rien placé sinon va retourner l'index
//d'un tableau où le joueur à n croix alignées et où l'ordi n'a encore jamais joué et sinon va retourner
//le premier index d'un tableau où il y a un emplacement vide

function findOccurOrdi(tab , n){
  for(var i=0;i<tab.length;i++){          //verifie si il y a une ligne, colonne ou diagonale où il y a n "ordi" et 0 "player"
    var count = 0;
    for(var j=0;j<tab[i].length;j++){
      if(tab[i][j]=="ordi"){
        count+=1;
      } else if(tab[i][j]=="player"){
        j=tab[i].length;
        count=0;
      }
    }
    if(count==n) return i;
    count = 0;
    for(var j=0;j<tab[i].length;j++){     //verifie si il y a une ligne, colonne ou diagonale où il y a n "player" et 0 "ordi"
      if(tab[i][j]=="player"){
        count+=1;
      } else if(tab[i][j]=="ordi"){
        j=tab[i].length;
        count = 0;
      }
    }
    if(count==n) return i;
  }
  if(n==1){                               //si n=1 retourne l'index du premier tableau contenant une case vide "empty"
    for(var i=0;i<tab.length;i++){
      for(var j=0;j<tab[i].length;j++){
        if(tab[i][j]=="empty") return i;
      }
    }
  } else {return -1;}                     //retourne -1 pour que la fonction ordi rappelle findOccurOrdi avec en paramètre n-1 à la place de n
}

function isEnded(tab,size){               //vérifie si le joueur où l'ordi a complété une ligne, une colonne ou une diagonale
  var count;
  for(var i=0;i<tab.length;i++){
    count = 0;
    for(var j=0;j<tab[i].length;j++){
      if(tab[i][j]=="player"){
        count+=1;
      }
    }
    if(count==size) return true;
    count=0;
    for(var j=0;j<tab[i].length;j++){
      if(tab[i][j]=="ordi"){
        count+=1;
      }
    }
    if(count==size) return true;
  }
  return false;
}

function init(size){  //fonction permettant d'initialiser les tableaux statement et sources en fonction de la taille de grille demandé par le joueur
  var tab1=[];
  var tab2=[];
  var k=0;
  var img = document.querySelectorAll("img");
  for(var i=0;i<((size*2)+2);i++){
    tab1=[];
    tab2=[];
    for(var j=0;j<size;j++){
      tab1[j]="empty";
      if((i<=size && k==(size**2)) || (i>size && k==size)) k=0;
      if(i<size) tab2[j]=img[k];
      else if(i>=size && i<size*2) tab2[j]=img[(k*size)+i-size];
      else if(i==size*2) tab2[j]=img[(k*size)+j];
      else tab2[j]=img[(size*(k+1))-(j+1)];
      k++;
    }
    if(firstInit) statement[i]=tab1;
    sources[i]=tab2;
  }
}

function play(){  //fonction qui lance le jeu
  init(Number(document.getElementById("size").innerHTML));
  var img = document.querySelectorAll("img");
  var equality = [];
  for(var j=0;j<img.length-1;j++){
    img.onclick=function(){click_image(j);};
  }
}




window.onload = play;
