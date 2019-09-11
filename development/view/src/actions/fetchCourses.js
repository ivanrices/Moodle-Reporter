import {  FETCH_COURSES, PROFESOR } from '../constants';

import { createAction } from 'redux-actions';
import { apiGet } from '../api'
import { urlcourseUsers } from '../api/url';

//midleware redux promises
//recibe type y una promise, al concluir hace el duplicado del type con el nuevo payload
export const fetchCourses = createAction(FETCH_COURSES, apiGet(urlcourseUsers+"/0/"+PROFESOR));

