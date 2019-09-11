<?php
//Configuracion de mysql
class database{
    private $dbHost = "localhost";
    private $dbUser = "root";
    private $dbPass = "";
    private $dbName = "unamcap";

    //conección
    public function conectnDB(){
        $mysqlConnect = "mysql:host=$this->dbHost;dbname=$this->dbName;charset=utf8";
        $dbConneccion = new PDO($mysqlConnect, $this->dbUser, $this->dbPass);
        $dbConneccion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $dbConneccion;
    }
}