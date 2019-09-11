import React from 'react';
import {Row, Col, Card, Container, Button, Modal,Spinner} from 'react-bootstrap';
import UcFirst from "../../../App/components/UcFirst";
import Aux from "../../../hoc/_Aux";

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

import { connect } from 'react-redux';
//action creator:
import { fetchAlumnos } from '../../../actions/fetchAlumnos';
import { fetchProfesor } from '../../../actions/fetchProfesor';
//component list
import  ProfesorList  from '../../components/ProfesorList';
import { getAlumnos,getProfesor } from '../../../selectors/usuarios';
//creador de tablas
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

//info para logs
import { getLogs,getSingleLogs } from './../../../api'
import { urlLogs } from './../../../api/url';

//import pdf component
import ConcentradoUsuario from './../../components/pdf/ConcentradoUsuario';
import RegistroUsuario from '../../components/pdf/RegistroUsuario';

import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';


class Profesor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
          //obtiene la consulta que hace el fetch getLogs()  
          open: false,
          logsState:[],
          totalLogsState:[],
          pdfLogs:[],
          profesorCount:0,
          userType:3,
        };
      }
    openPDFmodal(idCurso, idUsuario, userName){
        this.setState({ open: true });
        //get and set all users fetch data logs
        if(idCurso == 0){
            const logs =  getLogs(urlLogs, 0, this.state.userType)   
                logs.then((result) => (this.setState({ totalLogsState: result}) ))   

        }else{
            const logs =  getSingleLogs(urlLogs, idUsuario, this.state.userType, idCurso, userName)   
                logs.then((result) => (this.setState({ pdfLogs: result}) ))   
        }    
    };

    closePDFmodal = () => {

        this.setState({ totalLogsState: []})
        this.setState({ pdfLogs: []})
        
        this.setState({ open: false });                
    };
    componentDidMount(){
        //hace el fetch de usuarios, y crea 3 variables globales
        if(this.props.profesores.length == 0){
            this.props.fetchProfesor();                    
        }            

    }    


    handleDataChange = ({ dataSize }) => {
        this.setState({ profesorCount: dataSize });
        console.log(this.state.profesorCount);
    }
    showProfesores(){   
        //formato de cada row de usuario profesor/alumno    
         
        function textFormatter(cell, row) {
            return (
            <Row>
                <Col xs="1"><img className="rounded-circle" style={{width: '30px'}} src={avatar2} alt="Profesor"/></Col>
                <Col><strong>{`${row.lastname} `}</strong>{ row.firstname }</Col>         
                <Col className="format-expanse-user"><h5>Último Acceso a moodle:</h5><h6 className="row-text-bt"><i className="fa fa-circle text-c-green f-10 m-r-15"/>
                     {  row.lastaccess.length >=  2 ?
                        moment.unix(row.lastaccess).format("LL"):
                        "Sin actividad"} </h6>
                </Col>       

            </Row>
            );          
        }
        function tituloFormat(column, colIndex) {
            return (
              <h5 className="card-title headerbtable col-xs-12 col-md-6 col-lg-4">.</h5>
            );
          }
        //creacion y formato de las columnas de la tabla
        //con collapse
        const columns = [{
            dataField: 'firstname',
            text: ' ',
            headerFormatter: tituloFormat,
            formatter: textFormatter,
            align: 'left',
            classes: 'columnbtable',
            fullUserName: "",
          }];

          const expandRow = {
            onlyOneExpanding: true,
            showExpandColumn: false,
            expandColumnPosition: 'right',
            parentClassName: 'parent-expand-foo',            
            onExpand: (row, isExpand, rowIndex, e) => {                                
                const { logsState } = this.state;      
                const { fullUserName } = this.state;      
                const fullname = `${row.firstname} ${row.lastname}`
               
                //si el collapse esta expandido obtiene info de ese usuario 
                if(isExpand === true){ 
                    //llama una function que obtiene y filtra los logs, 
                    //después lo agrega a una variable global de esta clase
                   
                   const logs =  getSingleLogs(urlLogs, row.id,3,0,"","")   
                   logs.then((result) => (this.setState({ logsState: result, fullUserName : fullname})  ))                                                       
                }                 

            },
            //hace el render dentro de cada usuario profesor/alumno
            renderer: row => (
                <Container > 
                    {this.state.logsState.map(function(log,index, arr){                        
                        if(arr.length-1 == index){
                            return <Row className="justify-content-md-center"><Col className="total-registros" xs={6} sm={6} md={4}>                         
                                    <h3><strong>{`${log.total} `}</strong>Registros de actividad</h3>
                                    </Col>

                                    {log.total == 0 ?
                                    <Col className="total-registros" xs={6} sm={6} md={{ span: 1, offset: 1 }}><h3>Inactivo</h3></Col> :
                                    <Col className="total-registros" xs={6} sm={6} md={{ span: 1, offset: 1 }}><h3>Activo</h3></Col>
                                    }
                                    
                                   </Row>  
                        }

                    })}

                    <Row  className="justify-content-sm-center">                                                            
                    {this.state.logsState.map(log =>   
                    <Col xs={12} sm={6} md={4} key={log.courseid} >                       
                        <Card key={`${log.courseid}cardus`} className="log-user-card">
                            <Card.Body key={`${log.courseid}cardbody`}>
                                <Row>
                                  <Col className="log-count">                                      
                                      
                                      <p key={`${log.courseid}pcount`}>{log.first !== null ? log.count : 0}</p>
                                      <p className="log-count-title" key={`${log.courseid}pcount-tit`}>INTERACCIONES</p>                                      
                                  </Col>
                                  <Col className="log-date">
                                    <Col className="title-date">
                                        <h6  key={`${log.courseid}pfatitle`}>Primer</h6>
                                        <p key={`${log.courseid}pfa`}>{ log.first != null ?
                                            moment.unix(log.first).format("LL"):
                                            "Sin actividad"}
                                        </p>
                                    </Col>
                                    <Col className="title-date">
                                        <h6  key={`${log.courseid}platitle`}>Último</h6>
                                        <p key={`${log.courseid}pfa`}>{ log.last != null ?
                                            moment.unix(log.last).format("LL"):
                                            "Sin actividad"}
                                        </p>
                                    </Col>
                                  </Col>
                                </Row>                           
                                <hr/>       
                                <Row className="log-course-catg">                                    
                                    <Col xs="12"  key={`${log.courseid}pcateg`} ><span>DIPLOMADO: </span>{log.name}</Col>
                                    <Col xs="12"  key={`${log.courseid}pfnam`}><span>CURSO: </span>{log.fullname}</Col>
                                    <Col xs="12" className="log-pdf">
                                    <Button variant={'outline-secondary'}  
                                            size="sm" 
                                            block
                                            onClick={()=>this.openPDFmodal(log.courseid,log.userid, this.state.fullUserName)} 
                                            disabled={this.state.open}><UcFirst text="PDF" /></Button>
                                    </Col>
                                </Row>                                
                            </Card.Body>                            
                        </Card>                        
                    </Col>     
                    )}
                    </Row>
                </Container>

              
            )
          };
        //listado de profesores viene de redux en el actionCreator fetchProfesores        
        if(this.props.profesores[0]){
           return  (    
            <Row className="tableUsers">
                <Col xs="12">
                <BootstrapTable 
                    keyField='id'
                    onDataSizeChange={ this.handleDataChange }
                    data={ this.props.profesores[0]}
                    columns={ columns }
                    condensed
                    expandRow={ expandRow }
                    bordered={ false }
                    pagination={ paginationFactory()}
                    noDataIndication="No hay profesores"
                    filter={ filterFactory() 
                    }/>
                </Col>
            </Row>                                          

           )

        }
    }


    render() {   
    
        return (
   
            <Aux >
                <Modal show={this.state.open} onHide={this.closePDFmodal}
                       dialogClassName="modal-pdf">
                    <Modal.Header closeButton>
                    <Modal.Title>Concentrado de profesores</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.totalLogsState.length > 0 ? <ConcentradoUsuario logs={this.state.totalLogsState}></ConcentradoUsuario> :                                                 
                            this.state.pdfLogs.length > 0 ? <RegistroUsuario logs={this.state.pdfLogs}></RegistroUsuario> : 
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
                    <Col  xs="6" sm="3" className="header-new-format">PROFESORES </Col>
                    <Col   xs="2" sm="1"  className="header-count">{this.state.profesorCount > 0 ? this.state.profesorCount :  this.props.profesores.length > 0 ? this.props.profesores[0].length : 0 }</Col>
                    
                    
                    <Col><Button variant={'outline-primary'}  
                            onClick={()=>this.openPDFmodal(0,0,"")} 
                            disabled={this.state.open}>
                            <UcFirst text="PDF" /></Button>
                    </Col>
                
                </Row>
                <Row> 
                </Row>                
                <Row >                                       
                    <Col md={12} xl={12}>                        
                        <Card >
                            <Card.Body className='px-0 py-2' >
                                {
                                    this.showProfesores()
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
    profesores: getProfesor(state),
});


//connect(props variable,props.functions reducers);
  export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Profesor));