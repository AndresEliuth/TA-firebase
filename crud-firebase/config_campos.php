<?php
// Este arreglo define qué campos tendrá tu sistema.
// Si quieres agregar uno nuevo, solo añade una línea aquí.
$mis_campos = [
    "codigo"      => ["tipo" => "text",   "label" => "Código de Barras"],
    "nombre"      => ["tipo" => "text",   "label" => "Nombre del Producto"],
    "precio"      => ["tipo" => "number", "label" => "Precio de Venta ($)"],
    "existencias" => ["tipo" => "number", "label" => "Stock / Existencias"]
];
?>