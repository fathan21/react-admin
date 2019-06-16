import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from 'reactstrap';

import KaryawanChart from '../../views/App/KaryawanChart/';
import IzinKerjaChart from '../../views/App/IzinKerjaChart/';
import AlatBeratChart from '../../views/App/AlatBeratChart/';
import KecelakaanKerjaChart from '../../views/App/KecelakaanKerjaChart/';


class Dashboard extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    const displayFilter = 'none';
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="6">
            <KaryawanChart displayFilter={displayFilter}></KaryawanChart>
          </Col>
          <Col xs="12" sm="12" lg="6">
            <IzinKerjaChart displayFilter={displayFilter}></IzinKerjaChart>
          </Col>
        </Row>
          <Row>
            <Col xs="12" sm="12" lg="6">
              <KecelakaanKerjaChart displayFilter={displayFilter}></KecelakaanKerjaChart>
            </Col>
            <Col xs="12" sm="12" lg="6">
              <AlatBeratChart displayFilter={displayFilter}></AlatBeratChart>
            </Col>
          </Row>

      </div>
    )
  }
}

export default Dashboard;
