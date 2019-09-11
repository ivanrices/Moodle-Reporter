<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;




require '../vendor/autoload.php';
require '../src/config/database.php';
$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

//Ruta participantes
require '../src/routes/participantes.php';
//ruta logs
require '../src/routes/logs.php';
require '../src/routes/dashboard.php';


$app->run();


