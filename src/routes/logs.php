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
//'/logs/{us_ide}' --> recibir variables
$app->get('/logs/{us_ide}/{us_rol}/{idCourse}', function(Request $request, Response $response){
    $user = $request->getAttribute('us_ide'); //---> cuando se recibe por get
    $role = $request->getAttribute('us_rol'); //---> cuando se recibe por get
    $course = $request->getAttribute('idCourse');
    if($course == 0){
        $course_where = " ";
        $orderby = " order  BY 1";
    }else{
        $course_where = " sigem_course.courseid = $course AND ";
        $orderby = " order  BY 2";
    }
    
    
    //print($id_user);
    //$id_participante = $request->getParam('id_participante');
    if($user != 0){
        $sql = "SELECT
            sigem_course.coursename as fullname,
            logs_user.timecreated as timecreated,
            sigem_course.categoryname as name,
            sigem_course.courseid as courseid,
            sigem_course.userid as userid 
            FROM
            sigem_course         
            LEFT JOIN 
            (
                SELECT
                courseid as id,
                logtime as timecreated
                FROM
                sigem_log_courseuser
                WHERE
                userid = $user
            ) logs_user ON logs_user.id = sigem_course.courseid              
            WHERE
            sigem_course.userid = $user AND
            sigem_course.roleid = $role AND ".$course_where.
            "sigem_course.contextlevel IN (40, 50) ".$orderby."";
    }else{ //get all user log by roll
        $sql = "SELECT
        sigem_course.userid as id_user,
        sigem_course.courseid as courseid,
        sigem_course.firstname as firstname,
        sigem_course.apellido as apellido,
        sigem_course.coursename as fullname,
        logs_user.timecreated as timecreated,
        sigem_course.categoryname as name  
        FROM
        sigem_course
        LEFT JOIN 
        (
            SELECT
            courseid as id,
            logtime as timecreated,
            userid as id_user
            FROM
            sigem_log_courseuser
        ) logs_user ON logs_user.id = sigem_course.courseid  AND logs_user.id_user = sigem_course.userid   
        WHERE sigem_course.roleid = $role AND						
        sigem_course.contextlevel IN (40, 50) 
        order  BY 1 asc, 2 asc";
    }

    
 
    try{
        $db = new database();        
        $db = $db->conectnDB();        
        $resultado = $db->query($sql);
        if($resultado->rowCount()>0){
            $logs = $resultado->fetchAll(PDO::FETCH_OBJ);
            print_r(json_encode($logs,JSON_UNESCAPED_UNICODE));
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
