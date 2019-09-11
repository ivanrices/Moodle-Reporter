import React from 'react';
import {Row, Col, Card, Container, Button, Modal, Spinner, Form} from 'react-bootstrap';
import UcFirst from "../../../App/components/UcFirst";
import Aux from "../../../hoc/_Aux";

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

import { connect } from 'react-redux';
//action creator:
import { fetchProfesor } from '../../../actions/fetchProfesor';

import { getAlumnos,getProfesor } from '../../../selectors/usuarios';
//creador de tablas
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { multiSelectFilter, Comparator  } from 'react-bootstrap-table2-filter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


//info para logs
import { getLogs, getSingleLogs, getCourses, getCourseUsers } from './../../../api'
import { urlLogs, urlCourses, urlcourseUsers } from './../../../api/url';

//import pdf component
import ListConcentradoUsuarios from './../../components/pdf/Listados/ListConcentradoUsuarios';
import RegistroUsuario from '../../components/pdf/RegistroUsuario';

import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { PROFESOR } from '../../../constants';

//form
class ProfesorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
          //obtiene la consulta que hace el fetch getLogs()  
          open: false,
          pdfLogs:[],
          userCount:0,
          userType:3,
          qualityFilter:()=>{},
          courses:[],
          userCourses:[],
        };
      }
    openPDFmodal(idCurso, idUsuario, userName){
        this.setState({ open: true });
    };

    closePDFmodal = () => {   
        this.setState({ open: false });                
    };
    getCourseUser = (event) =>{       
      if( event.target.value > 0 ){
        const courseUsers =  getCourseUsers(urlcourseUsers, event.target.value, PROFESOR)
        courseUsers.then((userCoursesRes) => (this.setState({ userCourses: userCoursesRes})  )) 
      }else{
        this.setState({ userCourses: [""] })
      }       
      
    }
    componentDidMount(){        
        const courses =  getCourses(urlCourses) 
        courses.then((coursesRes) => (this.setState({ courses: coursesRes})  ))            
        if(this.props.profesor.length == 0){
            this.props.fetchProfesor();                    
        }                  
    }    


    handleDataChange = ({ dataSize }) => {
        this.setState({ userCount: dataSize });
       // console.log(this.state.userCount);
    }
    showUsers(){ 
        
        //formato de cada row de usuario profesor/alumno             

        function tituloFormat(column, colIndex) {
            return (
              <h5 className="card-title headerbtable col-xs-12 col-md-6 col-lg-4">.Profesores</h5>
            );
          }
        
        const MyExportCSV = (props) => {
            const handleClick = () => {
              props.onExport();
            };
            return (<Row className="button-header-container">
                        <Col xs={0} sm={6}>.</Col>
                        <Col xs={6}>
                            <Col  xs={12} sm={9} md={7}><Button className="btn_right" variant={'outline-primary'}  
                                        onClick={()=>this.openPDFmodal(0,0,"")} 
                                        disabled={this.state.open}>
                                        <UcFirst text="PDF" /></Button>
                            </Col>
                            <Col  xs={12} sm={9} md={7} >                
                            <Button className="btn_left" variant={'outline-primary'}
                                    onClick={ handleClick}><UcFirst text="CSV" /></Button>
                            </Col> 
                        </Col> 
                                                              
                    </Row>
                    
            );
          };

          //course filter variables
          const selectOptions = {
          };
          function textFormatterName(cell, row) {
            return (
                <Row className="name-format">                
                    <Col><p><strong>{ row.firstname }</strong></p></Col>              
                </Row>
            );          
           } 
            function textFormatterDatefirst(cell, row) {                
                return (
                <Row>                   
                    <Col className="format-expanse-user"><h6 className="row-text-bt"><i className="fa fa-circle text-c-green f-10 m-r-15"/>
                         {  row.lastaccess.length >=  2 ?
                            moment.unix(row.lastaccess).format("LL"):
                            "Sin actividad"} </h6>
                    </Col>       
    
                </Row>
                );          
            } 
            function textFormatterDatelast(cell, row) {                
                return (
                <Row>                   
                    <Col className="format-expanse-user"><h6 className="row-text-bt"><i className="fa fa-circle text-c-green f-10 m-r-15"/>
                         {  row.firstaccess.length >=  2 ?
                            moment.unix(row.firstaccess).format("LL"):
                            "Sin actividad"} </h6>
                    </Col>       
    
                </Row>
                );          
            } 
            function formatname(cell, row){
                return  row.firstname; 
            }
            function formatdate(cell, row){
                if(row.lastaccess){
                    return row.lastaccess.length >=  2 ?
                            moment.unix(row.lastaccess).format("LL"):
                            "Sin actividad"
                }else if(row.firstaccess){
                    return row.firstaccess.length >=  2 ?
                            moment.unix(row.firstaccess).format("LL"):
                            "Sin actividad"
                }
                
            }
        //creacion y formato de las columnas de la tabla
        //con collapse
        const columns = [{
            dataField: 'id',
            csvFormatter: formatname,
            text: 'Nombre',
            title:false,
           // headerFormatter: tituloFormat,
          // formatter: cell => selectOptions[cell],
          formatter: textFormatterName,
            filter: multiSelectFilter({
                options: selectOptions,
                comparator: Comparator.EQ,
                getFilter: (filter) => {     
                 this.qualityFilter = filter        
                }
              }),
            align: 'left',
            csvText: 'Nombre',
            classes: 'columnbtable',
          },
          {
            dataField: 'lastname',
            sort: true,
            text: 'Apellido',
           // headerFormatter: tituloFormat,
            align: 'left',
            csvText: 'Apellido',
            classes: 'columnbtable',
          },
          {
            dataField: 'firstaccess',
            csvFormatter: formatdate,
            align: 'center',
            sort: true,
            formatter: textFormatterDatefirst,
            text: 'Primer Acceso',
            csvText: 'Primer Acceso',
            //headerFormatter: tituloFormat,
            classes: 'columnbtable',
          },
          {
            dataField: 'lastaccess',
            csvFormatter: formatdate,
            align: 'center',
            sort: true,
            text: 'Ultimo Acceso',
            csvText: 'Ultimo Acceso',
            formatter: textFormatterDatelast,
            //headerFormatter: tituloFormat,
            classes: 'columnbtable',
          }];


        //listado de profesores viene de redux en el actionCreator fetchProfesores        
        if(this.props.profesor[0]){
           return  (    
            <Row className="tableUsers-list">                
                <Col xs="12">
                <ToolkitProvider
                    keyField="id"
                    data={ this.props.profesor[0] }
                    columns={ columns }
                    exportCSV={ { onlyExportFiltered: true, 
                        exportAll: false,  
                        noAutoBOM: false,
                        fileName: "Tutores.csv"
                        } }>
                    {
                        props => (
                            <Col xs="12" className="cont-table-csv">

                            <MyExportCSV { ...props.csvProps } />
                                                    
                            <BootstrapTable 
                                { ...props.baseProps }   
                                onDataSizeChange={ this.handleDataChange }                                       
                                condensed
                                striped
                                hover
                                bordered={ false }
                                pagination={ paginationFactory()}
                                noDataIndication="No se encontraron alumnos"
                                filter={ filterFactory() }/>
                        </Col>
                        )
                    }
                </ToolkitProvider>
                </Col>
            </Row>                                          

           )

        }
    }


    render() {                 
      if(this.state.userCourses.length > 0){
        // ["106", "104","6","146","148"]
        const data =  this.state.userCourses
        this.qualityFilter(data)        
      }
        return (   
            <Aux >
                
                <Modal show={this.state.open} onHide={this.closePDFmodal}
                       dialogClassName="modal-pdf">
                    <Modal.Header closeButton>
                    <Modal.Title>Concentrado de tutores</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.props.profesor.length > 0 ? <ListConcentradoUsuarios data={this.props.profesor} type="alumnos"></ListConcentradoUsuarios> :  
                            <Row className="justify-content-md-center"><Col xs="12" class="spinner_col"><Spinner animation="grow" variant="info" />Cargando...</Col></Row>
                        }           
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.closePDFmodal}>
                        Cerrar
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                <Row className="header-container">                                                                           
                    <Col  xs="6" sm="3" className="header-new-format">TUTORES </Col>
                    <Col   xs="2" sm="1"  className="header-count">{this.state.userCount > 0 ? this.state.userCount :  this.props.profesor.length > 0 ? this.props.profesor[0].length : 0 }</Col>       
                </Row>   
           
                <Row >                       
               
                    <Col md={12} xl={12}>                        
                        <Card >
                            
                            <Card.Body className='px-0 py-2' >
                            <Row className="justify-content-md-center" >
                                <Col className="select-course-header" >
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control as="select" onChange={this.getCourseUser}>
                                    <option value = "">Selecciona un curso</option>
                                    {
                                        this.state.courses.map(log =>   
                                        <option value = {log.id}>{log.fullname}</option>
                                        )       
                                    }
                                            
                                    </Form.Control>
                                </Form.Group>
                                </Col> 
                            </Row> 
                                
                                {
                                    this.showUsers()
                                }
                                
                                
                            </Card.Body>
                        </Card>
                    </Col>                                                                                        
                </Row>

            </Aux>
        );
    }
    
}


//simplificado
//const mapDispatchToProps = { fetchProfesores }

//No simplificado
//hace el dispatch de los usuarios alumnos/profesores
const mapDispatchToProps = dispatch => {
    return {
        fetchProfesor: () => dispatch(fetchProfesor()),
    }
};

//hace posible que se puedan user las variables de redux
const mapStateToProps = state => ({
    alumnos: getAlumnos(state),
    profesor: getProfesor(state),
});


//connect(props variable,props.functions reducers);
  export default withRouter(connect(mapStateToProps, mapDispatchToProps )(ProfesorList));