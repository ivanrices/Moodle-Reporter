import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

import { connect } from 'react-redux';

//action creators:
import { fetchUsuarios } from './../../actions/fetchUsuarios'
import { fillAlumnos } from './../../actions/fillAlumnos';
import { fillProfesores } from './../../actions/fillProfesores';

//selectors que obtienen los datos globales
import { getUsuarios,getAlumnos,getProfesores } from './../../selectors/usuarios';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

//charts
import PieDonutChart from "./../Charts/PieDonutChart";

class Dashboard extends React.Component {

    componentDidUpdate(){
        if(this.props.usuarios.length > 0){
            const alumnosUsers = this.props.usuarios.filter(alumno => alumno.roleid === "5");
            const profesoresUsers = this.props.usuarios.filter(alumno => alumno.roleid === "3");                                       
            if(!this.props.alumnos[0] && !this.props.alumnos[0]){
                this.props.fillAlumnos(alumnosUsers);  
                this.props.fillProfesores(profesoresUsers);  
            }          
        }
    }
    componentDidMount(){
        if(this.props.usuarios.length == 0){
            this.props.fetchUsuarios()          
        }            
        if(this.props.usuarios.length > 0 && !this.props.alumnos[0]){
            this.props.fillAlumnos(); 
            this.props.fillProfesores();
        }
    }   

    
    render() {
        const tabContent = (
            <Aux>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Julie Vad</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3544</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>2739</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Frida Thomse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>1032</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>8750</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>8750</span>
                    </div>
                </div>
            </Aux>
        );

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Profesores</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-5">
                                        <h1 className="text-center f-w-300 d-flex justify-content-center m-b-0 ">
                                            { 
                                                this.props.profesores[0] ? this.props.profesores[0].length : "loading data"                                                                                            
                                            }
                                        </h1>
                                    </div>
                                    <div className="text-center col-7">
                                    <PieDonutChart/>
                                    </div>
                                </div>    
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Estudiantes</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> 
                                        { 
                                            this.props.alumnos[0] ? this.props.alumnos[0].length : "loading data"                                                                                            
                                        }
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">36%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Coordinadores</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> 3</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">70%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
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
        fetchUsuarios: () => dispatch(fetchUsuarios()),
        fillAlumnos: (alumnos) => dispatch(fillAlumnos(alumnos)),
        fillProfesores: (profesores) => dispatch(fillProfesores(profesores)),
    }
};


const mapStateToProps = state => ({
    usuarios: getUsuarios(state),
    alumnos: getAlumnos(state),
    profesores: getProfesores(state),
});


//connect(props variable,props.functions reducers);
export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Dashboard));