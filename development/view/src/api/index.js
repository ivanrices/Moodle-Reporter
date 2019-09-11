import moment from 'moment';
//obtiene datos del servidor, al ser llamado por un action creator
export const apiGet = (url) => () => fetch(url).then(v=>v.json());

//obtiene los logs de moodle
export const getLogs = (urlLogs, idUser, idRol,idCourse) => {                
    return fetch(`${urlLogs}/${idUser}/${idRol}/${idCourse}`
        ).then(logs => (logs.json()).then(logsJson =>{       
       const usuario = [];                                                        
       const mapUser = new Map();
        let contUser = 0;
        let countcourse = -1;
       let count = 0;       
       let first = 0;
       let last = 0;
       const map = new Map();
           for(const item of logsJson){    
               if(!mapUser.has(item.id_user+item.courseid)){                
                mapUser.set(item.id_user+item.courseid,  true)   
                count = 0                     
                if(!map.has(item.id_user)){                                                                
                    map.set(item.id_user, true)
                    contUser = 0;
                    countcourse = countcourse + 1;                         
                    usuario.push({
                        nombre: item.firstname+" "+item.apellido,
                        courses:[{
                            fullname: item.fullname,                     
                            count: count +1,
                            first: 0,
                            last:0
                        }]
                    })
                    }else{                     
                        contUser = contUser + 1;                
                        usuario[countcourse].courses.push({
                            fullname: item.fullname,
                            count: count +1,
                            first: 0,
                            last:0
                        }) 
                    }  
               }else{ 
                    count = count +1                              
                    usuario[countcourse].courses[contUser].count = count+1         
               }
               //hace un ordenamiento de burbuja para obtener la ultima 
               //y primer fecha de entrada por cada curso
               if(first > item.timecreated || first === 0 || usuario[countcourse].courses[contUser].first === 0){
                   first =  item.timecreated
                   usuario[countcourse].courses[contUser].first = item.timecreated
               }
               if(last  < item.timecreated || last === 0 || usuario[countcourse].courses[contUser].last === 0){
                   last = item.timecreated
                   usuario[countcourse].courses[contUser].last = item.timecreated
               }
           }            
           return usuario                                           
           //apicall(result)         
   })).catch(error => console.log('Error ' + error))                         
};

export const getSingleLogs = (urlLogs, idUser, idRol, idCourse, userName) => {                
    return fetch(`${urlLogs}/${idUser}/${idRol}/${idCourse}`
        ).then(logs => (logs.json()).then(logsJson =>{   
        if(idCourse == 0){                                                            
        const result = [];
        let count = 0;
        let countcourse = -1;
        let first = 0;
        let last = 0;
        let total = 0;
        const map = new Map();
            for(const item of logsJson){        
                    //filtra los courses por su id 
                    
                if(!map.has(item.courseid)){                                                                
                    map.set(item.courseid, true)
                    count = 0;
                    item.timecreated != null ? total = total+1 : total = total+0;
                    countcourse = countcourse + 1;
                    //inserta en nuevo array courses con id diferente
                    result.push({
                        courseid: item.courseid,
                        fullname: item.fullname,
                        userid: item.userid,
                        name: item.name,                       
                        count: count +1,
                        total: total,
                        first: 0,
                        last:0
                    })                                
                }else{
                    //cada vez que detecta un id repetido
                    //aumenta el contador, el cual indica la cantidad
                    //total de actividad en el curso
                    total = total+1;
                    result[countcourse].total = total 
                    count = count + 1;                   
                    result[countcourse].count = count+1                                
                }
                //hace un ordenamiento de burbuja para obtener la ultima 
                //y primer fecha de entrada por cada curso
                if(first > item.timecreated || first === 0 || result[countcourse].first === 0){
                    first =  item.timecreated
                    result[countcourse].first = item.timecreated
                }
                if(last  < item.timecreated || last === 0 || result[countcourse].last === 0){
                    last = item.timecreated
                    result[countcourse].last = item.timecreated
                }
            } 
                        

                
                return result 
           }else{

            const result = [];
            let count = 0;
            let countcourse = -1;
            const map = new Map();
                for(const item of logsJson){        
                        //filtra los accesos del usuario por fecha                                          
                    if(!map.has(moment.unix(item.timecreated).format("YYYY-MM-DD"))){                                                                
                        map.set(moment.unix(item.timecreated).format("YYYY-MM-DD"), true)
                        item.timecreated != null ? count = 1 : count = 0;
                         countcourse = countcourse + 1;
                        //inserta en nuevo array courses con fecha de diferencia
                        result.push({
                            timecreated: item.timecreated,              
                            count: count
                        })                                
                    }else{
                        //cada vez que detecta una fecha repetida
                        //aumenta el contador, el cual indica la cantidad
                        //total de actividad en el curso
                        count = count + 1;                   
                        result[countcourse].count = count                              
                    }
                } 

    
              result.push({
                courseName: logsJson[0].fullname,
                userName
              })  
                console.log("logs logsJson");
                console.log(logsJson);
                return result
           }  
           
                                                  
           //apicall(result)         
   })).catch(error => console.log('Error ' + error))                         
};
 
export const getCourses = (url) => {                
    return fetch(`${url}`
        ).then(courses => (courses.json()).then(coursesJson =>{   

        return coursesJson    
   })).catch(error => console.log('Error ' + error))                         
};

export const getCourseUsers = (url,idCourse,type) => {                
    return fetch(`${url}/${idCourse}/${type}`
        ).then(users => (users.json()).then(usersJson =>{   
            const result = [];
            for(const item of usersJson){             
                result.push(item.userid)            
            }
        return result    
   })).catch(error => console.log('Error ' + error))                         
};

