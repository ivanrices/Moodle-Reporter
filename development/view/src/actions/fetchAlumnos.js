import {  GET_ALUMNOS, ALUMNO } from '../constants';

import { createAction } from 'redux-actions';
import { apiGet } from '../api'
import { urlUsuarios } from '../api/url';

//midleware redux promises
//recibe type y una promise, al concluir hace el duplicado del type con el nuevo payload

export const fetchAlumnos = createAction(GET_ALUMNOS, apiGet(urlUsuarios+"/"+ALUMNO));
//export const fillAlumnos = createAction(GET_ALUMNOS);
