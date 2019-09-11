import { handleActions } from 'redux-actions';
import { GET_PROFESOR  } from '../constants/index';

//export const profesores = handleActions(FETCH_PROFESORES, (state, action) => [...action.payload],[]);
//anterior forma
/*export const profesores = handleAction(
    GET_ALUMNOS,
    (state, action) =>({
        val: action.payload
    }),
    {val:0}
);*/

export const profesor = handleActions({
    [GET_PROFESOR]: (state, action) => [action.payload]
},[])

