<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;




// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
    // whitelist of safe domains
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}









//GET all students
//'/students/{id_participante}' --> recibir variables
$app->get('/usuarios/{role}', function(Request $request, Response $response){
    $role = $request->getAttribute('role'); //---> cuando se recibe por get
    //$id_participante = $request->getParam('id_participante');
    $sql = "SELECT
    distinct(mdl_user.id) as id,
    firstname,
    mdl_user.lastname,
    mdl_role_assignments.roleid,
    mdl_user.firstaccess,
    mdl_user.lastaccess
    FROM
    mdl_role_assignments
    
    INNER JOIN mdl_user ON mdl_user.id = mdl_role_assignments.userid
    WHERE mdl_role_assignments.roleid = $role AND
    mdl_user.deleted = 0 AND
    mdl_user.suspended = 0 order by 3 asc";

    try{
        $db = new database();        
        $db = $db->conectnDB();        
        $resultado = $db->query($sql);
        if($resultado->rowCount()>0){
            $participantes = $resultado->fetchAll(PDO::FETCH_OBJ);
            print_r(json_encode($participantes,JSON_UNESCAPED_UNICODE));
           // print_r($participantes);
        }else{
            echo json_encode("No hay participantes");
        }
        $resultado = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->setMessahe().'}';
    }
});

$app->get('/courseuser/{course}/{type}', function(Request $request, Response $response){
    $course = $request->getAttribute('course');
    $type = $request->getAttribute('type');
    if($course != 0){
        $sql = "SELECT
        mdl_role_assignments.userid
        FROM
        mdl_role_assignments
        INNER JOIN mdl_context ON mdl_role_assignments.contextid = mdl_context.id
        INNER JOIN mdl_course ON mdl_context.instanceid = mdl_course.id
        WHERE
        mdl_context.contextlevel = 50 AND
        mdl_role_assignments.roleid = $type AND
        mdl_course.id = ".$course;
    }else{ // obtiene todos los cursos con sus profesores
        $sql = "SELECT
                mdl_course.id as courseid,
                mdl_course.fullname as fullname,
                mdl_role_assignments.userid as userid,
                mdl_user.firstname as firstname,
                mdl_user.lastname as lastname
                FROM
                mdl_role_assignments
                INNER JOIN mdl_context ON mdl_role_assignments.contextid = mdl_context.id
                INNER JOIN mdl_course ON mdl_context.instanceid = mdl_course.id
                INNER JOIN mdl_user ON mdl_role_assignments.userid = mdl_user.id
                WHERE
                mdl_context.contextlevel = 50 AND
                mdl_role_assignments.roleid = 3
                order by 2";
    }
    

    try{
        $db = new database();        
        $db = $db->conectnDB();        
        $resultado = $db->query($sql);
        if($resultado->rowCount()>0){
            $participantes = $resultado->fetchAll(PDO::FETCH_OBJ);
            print_r(json_encode($participantes,JSON_UNESCAPED_UNICODE));
           // print_r($participantes);
        }else{
            echo json_encode("No hay participantes");
        }
        $resultado = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->setMessahe().'}';
    }
});

$app->get('/courses', function(Request $request, Response $response){
    $user = $request->getAttribute('user');
    $sql = "SELECT
    mdl_course.id,
    mdl_course.fullname
    FROM
    mdl_course
    WHERE
    mdl_course.visible = 1 AND
    mdl_course.category NOT IN (0)
    ORDER BY 2";

    try{
        $db = new database();        
        $db = $db->conectnDB();        
        $resultado = $db->query($sql);
        if($resultado->rowCount()>0){
            $participantes = $resultado->fetchAll(PDO::FETCH_OBJ);
            print_r(json_encode($participantes,JSON_UNESCAPED_UNICODE));
           // print_r($participantes);
        }else{
            echo json_encode("No hay participantes");
        }
        $resultado = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->setMessahe().'}';
    }
});