import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
//registros de actividad
const Profesor = React.lazy(() => import('./App/containers/Profesor'));
const Alumnos = React.lazy(() => import('./App/containers/Alumnos'));

//Dashboard
const DashboardDefault = React.lazy(() => import('./App/containers/Dashboard'));

//Listados
const ProfesorList = React.lazy(() => import('./App/containers/List/ProfesorList'));
const AlumnosList = React.lazy(() => import('./App/containers/List/AlumnosList'));
const CoordinadorList = React.lazy(() => import('./App/containers/List/CoordinadorList'));
const CursoList = React.lazy(() => import('./App/containers/List/CoursesList'));
const CalificacionList = React.lazy(() => import('./App/containers/List/CalificacionList'));



const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    //registros de actividad
    { path: '/profesor', exact: true, name: 'Profesor', component: Profesor },
    { path: '/alumnos', exact: true, name: 'Alumnos', component: Alumnos },    
    //dashboard
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    //Listados
    { path: '/profesor-list', exact: true, name: 'Profesor', component: ProfesorList },
    { path: '/alumnos-list', exact: true, name: 'Alumnos', component: AlumnosList },    
    { path: '/coordinador-list', exact: true, name: 'Profesor', component: CoordinadorList },
    { path: '/cursos-list', exact: true, name: 'Alumnos', component: CursoList },    
    { path: '/calificacion-list', exact: true, name: 'Alumnos', component: CalificacionList },    

    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;