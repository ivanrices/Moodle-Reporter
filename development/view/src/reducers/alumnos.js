import { handleActions, handleAction } from 'redux-actions';
import { GET_ALUMNOS } from '../constants/index';


export const alumnos = handleActions({
    [GET_ALUMNOS]: (state, action) => [action.payload]
},[])

