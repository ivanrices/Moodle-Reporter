import {  GET_PROFESOR, PROFESOR } from '../constants';

import { createAction } from 'redux-actions';
import { apiGet } from '../api'
import { urlUsuarios } from '../api/url';

//midleware redux promises
//recibe type y una promise, al concluir hace el duplicado del type con el nuevo payload

export const fetchProfesor = createAction(GET_PROFESOR, apiGet(urlUsuarios+"/"+PROFESOR));
//export const fetchProfesores = createAction(GET_PROFESORES);

