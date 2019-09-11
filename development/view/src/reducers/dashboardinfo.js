import { handleActions } from 'redux-actions';
import { FETCH_DASHBOARDBINFO } from '../constants/index';

//export const profesores = handleActions(FETCH_PROFESORES, (state, action) => [...action.payload],[]);
export const dashboardinfo = handleActions({
    [FETCH_DASHBOARDBINFO]: (state, action) => [...action.payload]
},[])



