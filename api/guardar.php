<?php
    error_reporting(E_ALL);
ini_set('display_errors', 1)
header("Content-Type: application/json");


$fecha        = trim($_POST["fecha"] ?? "");
$num_mesas    = (int)($_POST["num_mesas"] ?? 0);
$planta       = $_POST["planta_electrica"] ?? "";
$puff         = $_POST["puff"] ?? "";
$lugar        = trim($_POST["lugar"] ?? "");
$invitados    = (int)($_POST["num_invitados"] ?? 0);
$tipo_fiesta  = trim($_POST["tipo_fiesta"] ?? "");
$hora         = trim($_POST["hora_evento"] ?? "");
$meson        = $_POST["meson"] ?? "";
$perros       = $_POST["perros"] ?? "";

if ($fecha === "" || $num_mesas < 1 || $invitados < 1 || $tipo_fiesta === "" || $hora === "") {
    echo json_encode(["ok" => false, "error" => "Faltan datos obligatorios"]);
    exit;
}

if ($lugar !== "piscina" && $lugar !== "salon") {
    echo json_encode(["ok" => false, "error" => "Lugar inválido"]);
    exit;
    echo json_encode(["ok" => true, "id" => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    echo json_encode(["ok" => false, "error" => "No se pudo guardar"]);
}
?>
