<?php
// Arreglo que define qué campos pide nuestra app de punto de venta
$mis_campos = [
    "codigo"      => ["tipo" => "text",   "label" => "Código de Barras"], 
    "nombre"      => ["tipo" => "text",   "label" => "Nombre del Producto"],
    "precio"      => ["tipo" => "number", "label" => "Precio ($)"],
    "existencias" => ["tipo" => "number", "label" => "Stock"]
];
?>