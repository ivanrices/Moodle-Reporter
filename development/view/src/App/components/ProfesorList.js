import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

import Aux from "./../../hoc/_Aux";
import DEMO from "./../../store/constant";

import avatar1 from './../../assets/images/user/avatar-1.jpg';
import avatar2 from './../../assets/images/user/avatar-2.jpg';
import avatar3 from './../../assets/images/user/avatar-3.jpg';


import { PropTypes } from 'prop-types';


class ProfesorList extends React.Component {
    constructor(){
        super();
        this.state = {
            profesor: [],
        };
      }
    render() {
        const { profesor } = this.props;
        return (
            <tr className="unread">
                <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                <td>
                    <h6 className="mb-1">{profesor.firstname+" "+profesor.lastname}</h6>
                    <p className="m-0">{profesor.email}</p>
                </td>
                <td>
                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                </td>
                <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Detalles</a></td>
            </tr>
        )
    }
}




export default ProfesorList;
