import { FETCH_DASHBOARDCLOGS, FETCH_DASHBOARDBINFO,GET_PROFESORES,PROFESOR } from '../constants';

import { createAction } from 'redux-actions';
import { apiGet } from '../api'
import { urlDashbrdBasicInfo, urlDashbrdCrseLogs } from '../api/url';

//midleware redux promises
//recibe type y una promise, al concluir hace el duplicado del type con el nuevo payload

export const fetchUsuariosCrseLogs = createAction ( FETCH_DASHBOARDCLOGS, apiGet(urlDashbrdCrseLogs) );
export const fetchDashboardBasicInfo = createAction ( FETCH_DASHBOARDBINFO, apiGet(urlDashbrdBasicInfo) );
