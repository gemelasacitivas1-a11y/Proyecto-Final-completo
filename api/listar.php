<?php
    error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');

$host = 'sql300.infinityfree.com';
$db   = 'if0_43405519_mpagina';
$user = 'if0_43405519';
$pass = 'tonada67';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['ok' => false, 'error' => 'Conexion fallida']);
    exit;
}
$conn->set_charset('utf8mb4');

$res = $conn->query("SELECT * FROM reservas ORDER BY fecha_registro DESC");
$filas = [];
while ($f = $res->fetch_assoc()) {
    $filas[] = $f;
}

echo json_encode(['ok' => true, 'reservas' => $filas]);
$conn->close();
