import { combineReducers } from 'redux';
import { alumnos } from './alumnos';
import { profesor } from './profesor';
import { dashboardinfo } from './dashboardinfo';
import { dashboardlogs } from './dashboardlogs';
import { courses } from './courses';
import menuReducer from './../store/menuReducer';


export default combineReducers({
    menuReducer,
    alumnos,
    profesor,
    dashboardinfo,
    dashboardlogs,  
    courses,  
})
