import { handleActions } from 'redux-actions';
import { FETCH_COURSES } from '../constants/index';

//export const profesores = handleActions(FETCH_PROFESORES, (state, action) => [...action.payload],[]);
export const courses = handleActions({
    [FETCH_COURSES]: (state, action) => [...action.payload]
},[])



