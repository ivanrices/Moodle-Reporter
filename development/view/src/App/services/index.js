export const filterCourseUsers = (courses) => {  
                  
const result = [];
let countcourse = -1;
const map = new Map();

for(const item of courses){         
    
    if(!map.has(item.courseid)){                                                                
        map.set(item.courseid, true)
        countcourse = countcourse + 1;   
        result.push({
            courseid: item.courseid,
            fullname: item.fullname,                                               
            profesor:[{
                firstname: item.firstname,                   
                lastname: item.lastname,  
            }]
        }) 
    }else{                                  
        result[countcourse].profesor.push({
            firstname: item.firstname,                   
            lastname: item.lastname, 
        }) 
    }              
}
//console.log("result")                
    console.log(result)  
return result    
            
};