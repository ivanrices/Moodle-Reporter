import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import UcFirst from "../../../App/components/UcFirst";

import Aux from "../../../hoc/_Aux";
import DEMO from "../../../store/constant";
import {ALUMNO, PROFESOR, COORDINADOR } from "./../../../constants";

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

import { connect } from 'react-redux';

//action creators:
import { fetchUsuariosCrseLogs, fetchDashboardBasicInfo } from '../../../actions/fetchDashboard'

//creador de tablas
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { multiSelectFilter, Comparator  } from 'react-bootstrap-table2-filter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

//selectors que obtienen los datos globales
import { getDashboardLogs,getDashboardInfo } from '../../../selectors/usuarios';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

//charts
import PieDonutChart from "../../components/Charts/PieDonutChart";
import MultiBarChart from "../../components/Charts/MultiBarChart";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {   
          data: [],
          open: false,
          option: 1
        };
      }
    componentDidMount(){
        if(this.props.dashboardinfo.length == 0 || this.props.dashboardlogs.length == 0){            
            this.props.fetchUsuariosCrseLogs() 
            this.props.fetchDashboardBasicInfo()        
        }            
    }   

    renderChart(data, type){
        return <MultiBarChart data={data} type={type}/>                   
    }
    handleClick(key){
        if(key == "participante"){
            if(this.state.option == 2){
                this.setState({option: 1});
            }
        }else{
            this.setState({option: 2});
        }
    }
    render() {
       
        return (
            <Aux>
                <Row>
                    <Col md={4} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Profesores</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-5">
                                        <h2 className="text-center f-w-300 d-flex justify-content-center m-b-0 ">
                                            { 
                                                this.props.dashboardinfo.map(function(total){
                                                    
                                                     if(total.roleid == PROFESOR){ return   total.usercount }                                     
                                                })                                                                                          
                                            }
                                        </h2>
                                    </div>
                                </div>    
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Alumnos</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h2 className="text-center f-w-300 d-flex justify-content-center m-b-0 ">
                                        {                                             
                                            this.props.dashboardinfo.map(function(total){                                                
                                                 if(total.roleid == ALUMNO){ return   total.usercount }                                     
                                            })                                                                                                                                                                                                                           
                                        }
                                        </h2>
                                    </div>
                                </div>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Coordinadores</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                    <h2 className="text-center f-w-300 d-flex justify-content-center m-b-0 ">
                                    {                                             
                                        this.props.dashboardinfo.map(function(total){                                                
                                                if(total.roleid == COORDINADOR){ return   total.usercount }else{ return 0}                                     
                                        })                                                                                                                                                                                                                           
                                    }                                    
                                    </h2>
                                    </div>
                               
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>                                                                                                        
                </Row>

                <Row className="table-dashboard">
                    <Col>
                        <Card>
                        <Card.Body>





                        <h3 className='mb-4'>CURSOS: { this.props.dashboardlogs.length}</h3>
                        <div className="row d-flex align-items-center">







               
                    <Col className="horizontal-bar">
                        <Tabs variant="pills" defaultActiveKey="participante" className="mb-3" onSelect={(e) => this.handleClick(e)}>
                            <Tab eventKey="participante" title="PARTICIPANTES" >
                                
                                {
                                   this.state.option == 1 ? this.renderChart(this.props.dashboardlogs,"participante") : 0
                                }
                                   <p className="chart-height">.</p>                                                           
              
                            </Tab>
                            <Tab eventKey="registros" title="REGISTROS DE ACTIVIDAD" >

                                {
                                   this.state.option == 2 ? this.renderChart(this.props.dashboardlogs,"registros") : 0
                                }   
                                     <p className="chart-height">.</p> 
    

                                   
                            </Tab>

                        </Tabs>

                    </Col>
                


                        
                        </div>
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
const mapDispatchToProps = dispatch => {
    return {
        fetchUsuariosCrseLogs: () => dispatch(fetchUsuariosCrseLogs()),
        fetchDashboardBasicInfo: () => dispatch(fetchDashboardBasicInfo())
    }
};


const mapStateToProps = state => ({
    dashboardinfo: getDashboardInfo(state),
    dashboardlogs: getDashboardLogs(state),
});


//connect(props variable,props.functions reducers);
export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Dashboard));