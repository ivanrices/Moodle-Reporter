import { handleActions } from 'redux-actions';
import { FETCH_DASHBOARDCLOGS } from '../constants/index';

//export const profesores = handleActions(FETCH_PROFESORES, (state, action) => [...action.payload],[]);
export const dashboardlogs = handleActions({
    [FETCH_DASHBOARDCLOGS]: (state, action) => [...action.payload]
},[])



