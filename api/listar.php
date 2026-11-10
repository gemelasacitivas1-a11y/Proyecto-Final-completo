<?php
header("Content-Type: application/json");
require "conexion.php";

try {
    $stmt = $pdo->query("SELECT * FROM reservas ORDER BY fecha DESC, hora_evento ASC");
    echo json_encode(["ok" => true, "datos" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
} catch (PDOException $e) {
    echo json_encode(["ok" => false, "error" => "No se pudo leer"]);
}
?>