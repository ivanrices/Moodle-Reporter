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
$app->get('/basicinfo', function(Request $request, Response $response){
    //$role = $request->getAttribute('role'); //---> cuando se recibe por get
    //$id_participante = $request->getParam('id_participante');
    $sql = "SELECT
    count(distinct(mdl_user.id)) as usercount,
    mdl_role_assignments.roleid as roleid
    FROM
    mdl_role_assignments    
    INNER JOIN mdl_user ON mdl_user.id = mdl_role_assignments.userid 
    WHERE mdl_role_assignments.roleid in (1,3,5)
    group by 2";

    try{
        $db = new database();        
        $db = $db->conectnDB();        
        $resultado = $db->query($sql);
        if($resultado->rowCount()>0){
            $participantes = $resultado->fetchAll(PDO::FETCH_OBJ);
            print_r(json_encode($participantes,JSON_UNESCAPED_UNICODE));
           // print_r($participantes);
        }else{
            echo json_encode("No hay datos");
        }
        $resultado = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->setMessahe().'}';
    }
});

$app->get('/courselogs', function(Request $request, Response $response){
    //$role = $request->getAttribute('role'); //---> cuando se recibe por get
    //$id_participante = $request->getParam('id_participante');
    $sql = "SELECT mdl_course.id as courseid,				
        mdl_course.fullname as fullname,
        COUNT(mdl_user.id) AS usercount,  
        logs_user.total
            FROM
            mdl_course
            INNER JOIN mdl_context ON mdl_course.id = mdl_context.instanceid
            INNER JOIN mdl_role_assignments ON mdl_context.id = mdl_role_assignments.contextid
            INNER JOIN mdl_user ON mdl_role_assignments.userid = mdl_user.id
            LEFT JOIN
                (
                    SELECT
                    Count(mdl_course.id) AS total,
                    mdl_course.id AS courseid,
                    mdl_course.fullname
                    FROM
                    mdl_logstore_standard_log
                    INNER JOIN mdl_course ON mdl_logstore_standard_log.contextinstanceid = mdl_course.id
                    WHERE
                    mdl_logstore_standard_log.contextlevel IN (40, 50) AND
                    mdl_course.category NOT IN (0)
                    GROUP BY 2
                ) logs_user ON logs_user.courseid = mdl_course.id 
            
            WHERE mdl_role_assignments.roleid = 5 AND						
            mdl_context.contextlevel IN (40, 50) 
            GROUP BY 1 order by 2";

    try{
        $db = new database();        
        $db = $db->conectnDB();        
        $resultado = $db->query($sql);
        if($resultado->rowCount()>0){
            $participantes = $resultado->fetchAll(PDO::FETCH_OBJ);
            print_r(json_encode($participantes,JSON_UNESCAPED_UNICODE));
           // print_r($participantes);
        }else{
            echo json_encode("No hay datos");
        }
        $resultado = null;
        $db = null;
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->setMessahe().'}';
    }
});

