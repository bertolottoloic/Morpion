<?php
  if(isset($_GET["size"])) {$size = $_GET["size"];}
  else {$size = 3;}
  if($size<3) {header('Location:index.php?error=t');}
  $proportionalite = 600/$size;
?>

<!DOCTYPE html>
<html>
  <head>
    <title>MORPION</title>

	<meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="style.css" />
    <script type="text/javascript" src="morpion.js"></script>
  </head>

<body>
  <a href="index.php" id="accueil">Accueil</a>
	<h1 id='morpion-title'>MORPION </h1>

    <hr>
<p id="size" style="visibility:hidden;"><?php echo $size;?></p>
<table class="tableau">
  <tr>
<?php
//retour à la ligne pour l'ajout des cases
	for($i=0;$i<$size*$size;$i++) {
		if( $i > 0 && ($i%$size) == 0 ) {echo "</tr>\n<tr>";}
    echo "<td><img src=\"images/undefined.png\" onclick=\"click_image(".$i.")\" name=\"".$i."\" witdh=\"".$proportionalite."\" height=\"".$proportionalite."\"></td>\n";
  }
  echo "</tr>";
?>
</table>
<input id="replay" type="button" onclick='window.location.reload(false)' value="Rejouer" />
</body>
</html>
