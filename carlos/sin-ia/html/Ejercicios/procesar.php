<?php
$nombre = $_POST['nombre'];
$email = $_POST['email'];

$archivo = fopen("datos.txt", "a");
fwrite($archivo, "Nombre: $nombre - Email: $email\n");
fclose($archivo);

echo "Datos guardados correctamente.";
?>
