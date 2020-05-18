
<!DOCTYPE html>
<html>
  <head>
    <title>MORPION</title>

	<meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="style.css" />
  </head>

<body>
	<h1 id="accueil-title">JEU-MORPION </h1>
    <hr>

  <h2> But du jeu </h2>
    <p>Le morpion est un jeu de réflexion se pratiquant à deux joueurs (un joueur humain contre la machine) </p>
    <p>au tour par tour et dont le but est de créer le premier un alignement sur une grille </p>
    <p>horizontalement, verticalement ou en diagonale.</p>

  <h2> Veux tu jouer?</h2>
  <form action="morpion.php" method="get">
    <p>Rentres la taille du tableau:</p>
    <input type="text" name="size" value="3">

    <input type="submit" value="GO!">
    <?php
      if(isset($_GET["error"])) echo "<p style=\"color:red;\">Vous devez rentrer une taille de tableau supérieure à 2</p>\n</form>\n";
      else echo "</form><br><br>\n";
    ?>
  <br>
  <br>
  <br>
  <div><img src="images/morpion.png" alt="grille de morpion" /></div>

</body>

  <footer>
    Jouer comporte des risques.
  </footer>
