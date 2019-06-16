import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import { Redirect } from 'react-router';

import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Alert,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Grid,
} from 'reactstrap';
import {Services,dateFormat,upperCase}  from '../../../provider/Services';

class KecelakaanKerja extends Component {

  constructor (props) {
    super(props);
    /* default state */
    this.state = {
                  title:'kecelakaan_kerja',
                  tHead:[{key:'no',label:"No",sort:false},
                          {key:'tgl',label:"Tgl",sort:false},
                          {key:'no_first_aid',label:"No First Aid",sort:false},
                          {key:'no_fatality',label:"No Fatality",sort:true},
                          {key:'no_medical_case',label:"No Medical Case",sort:true},
                          {key:'no_nears_miss',label:"No Nears Miss",sort:true},
                          {key:'no_fire',label:"No Fire",sort:true},
                          {key:'equipment_incident',label:"Equipment Incident",sort:true},
                          {key:'auto_mobile_ancident',label:"Auto_mobile Ancident",sort:true},
                          {key:'environmental_accident',label:"Environmental Accident",sort:true},
                          {key:'unsafe_condition',label:"Unsafe Condition",sort:true},
                          {key:'unsafe_action',label:"Unsafe Action",sort:true},
                          {key:'action',label:"Aksi",sort:false}],
                  orderBy:'tgl',
                  sortBy:'desc',
                  data:[],
                  totalData:0,
                  deleteModal:false,
                  id:0,
                  limit:10,
                  page:1,
                  search:{value:''},
                  alert:{msg:'test',type:'info',open:false},
                  showData:0,
                  toData:0,
                  apiUrl:'kecelakaan_kerja'
                };
                
    this.alertDismiss = this.alertDismiss.bind(this);
    this.btnDelete = this.btnDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.btnAdd = this.btnAdd.bind(this);
    this.btnEdit = this.btnEdit.bind(this);
    this.btnView = this.btnView.bind(this);
    this.btnSort = this.btnSort.bind(this);
    this.load = this.load.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.search = this.search.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }
  //onload
  componentWillMount(){
    this.load();
    let params = this.props.location.search!=''? Services.parseQueryParams(this.props.location.search):{};
    if(params.alert_type!=undefined && params.alert_type!=''){
        this.setState({
          alert: {open:true,type:params.alert_type,msg:decodeURI(params.msg)},
        });
    }
  }
  componentWillUnmount(){
  }

  //paging
  pageChange(pageNumber){
    this.state.page = pageNumber;
    this.load();
  }
  setLimit(event){
    const { name, value } = event.target;
    this.state.limit = value;
    this.state.page =1;
    this.load();
  }

  search(event){
    //console.log(this.state.search);
    this.state.page =1;
    this.load();
  }

  load(){
    var params={};
    params.limit = this.state.limit;
    params.page = this.state.page;
    params.orderBy = this.state.orderBy;
    params.sortBy = this.state.sortBy;
    params.search = JSON.stringify(this.state.search);
    Services.get(this.state.apiUrl,params)
    .then((res) => {
      var toData = this.state.limit + (this.state.page-1) * this.state.limit;
      var showData = 1 + (this.state.page-1) * this.state.limit;
      toData = toData > res.total?res.total:toData;
      this.setState({
        data:res.data,
        totalData:res.total,
        showData:1 + (this.state.page-1) * this.state.limit,
        toData:toData,
      });

      //console.log(this.state.showData);
      //console.log(res);
    })
    .catch(error => {console.error(error); alert('check your conection');});
  }

  /* btn click */
  alertDismiss(){
    this.setState({
          alert: {open:false},
    });
  }
  btnView(id) {
    this.props.history.push({
      pathname: '/'+this.state.title+'/form',
      search: '?id='+id+'&action=view',
      //state: {  }
    });
  }
  btnAdd() {
   this.props.history.push('/'+this.state.title+'/form'); 
  }
  btnEdit(id) {
    this.props.history.push({
      pathname: '/'+this.state.title+'/form',
      search: '?id='+id+'&action=edit',
      //state: {  }
    });
  }
  btnDelete(id) {
    this.setState({
          deleteModal: !this.state.deleteModal,
          id:id
    });
  }
  btnSort(key,order){
    this.setState({
          orderBy: key,
          sortBy:order
    });
    this.load();
  }

  delete(){
    var id = this.state.id;
    Services.delete(this.state.apiUrl+'/'+id)
    .then((res) => {
      this.btnDelete(id);
      this.load();
      this.setState({
        alert: {open:true,type:'info',msg:'success delete data'},
      });
    })
    .catch(error => {console.error(error);

      this.btnDelete(id);
      this.setState({
        alert: {open:true,type:'danger',msg:'delete failed'},
      });
    });
  }

  //table built
  generateTableHeaders(cols,sortBy,orderBy){
    const btnSort = this.btnSort;
    return cols.map(function(colData) {
        return <th key={colData.key}> {colData.label} 
          <i onClick={() =>btnSort(colData.key,'desc')} style={{ display: colData.sort ? '' : 'none',color: orderBy==colData.key && sortBy=='desc'  ? 'grey' : '' }} className="fa fa-caret-up fa-sm pull-right"></i> 
          <i onClick={() =>btnSort(colData.key,'asc')} style={{ display: colData.sort ? '' : 'none',color: orderBy==colData.key && sortBy=='asc'  ? 'grey' : ''  }} className="fa fa-caret-down fa-sm pull-right"></i> 
        </th>;
    });
  }

  generateTableRows(cols){
    const btnEdit = this.btnEdit;
    const btnView = this.btnView;
    const btnDelete = this.btnDelete;
    return cols.map(function(item,key) {
        return (
            <tr  key={item.id}>
              <td>{key+1}</td>
              <td>{dateFormat(item.tgl)}</td>
              <td  align="right">{item.no_first_aid}</td>
              <td  align="right">{item.no_fatality}</td>
              <td  align="right">{item.no_medical_case}</td>
              <td  align="right">{item.no_nears_miss}</td>
              <td  align="right">{item.no_fire}</td>
              <td  align="right">{item.equipment_incident}</td>
              <td  align="right">{item.auto_mobile_ancident}</td>
              <td  align="right">{item.environmental_accident}</td>
              <td  align="right">{item.unsafe_condition}</td>
              <td  align="right">{item.unsafe_action}</td>
              <td>
                <Button color="success" size="sm"  onClick={() =>btnEdit(item.id)} ><i className="fa fa-pencil"></i></Button>
                <Button color="info" onClick={() =>btnView(item.id)}   size="sm"><i className="fa fa-eye"></i></Button>
                <Button color="danger" onClick={() =>btnDelete(item.id)} size="sm"><i className="fa fa-trash"></i></Button>
              </td>
            </tr>
        );
    });
  }


  render() {
    var headerComponents = this.generateTableHeaders(this.state.tHead,this.state.sortBy,this.state.orderBy);
    const rowsComponents = this.generateTableRows(this.state.data);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>{upperCase(this.state.title)}</strong>
                <Button color="success" onClick={() => this.btnAdd()}  className="float-right" size="sm"><i className="fa fa-plus"></i>&nbsp; Add</Button>
              </CardHeader>
              <CardBody>
                  <Alert color={this.state.alert.type} isOpen={this.state.alert.open} toggle={this.alertDismiss}>
                    {this.state.alert.msg}
                  </Alert>
                  <FormGroup row>
                    <Col md="1">
                      <Label htmlFor="limit">Show</Label>
                    </Col>
                    <Col xs="2" md="2">
                      <Input type="select" name="limit" id="limit" onChange={this.setLimit.bind(this)} value={this.state.limit}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="1000">1000</option>
                      </Input>
                    </Col>
                    <Col md="5">
                      <Label >&nbsp;</Label>
                    </Col>
                    <Col md="1">
                      <Label htmlFor="value">Search</Label>
                    </Col>
                    <Col xs="3" md="3">
                      <Input type="text" id="value" name="value" onChange={event => {this.state.search.value=event.target.value}}
                      onKeyPress={event => {
                         if (event.key === 'Enter') {
                           this.search()
                         }
                       }}
                      />
                    </Col>
                  </FormGroup>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>{headerComponents}</tr>
                  </thead>
                  <tbody>
                    {rowsComponents}
                  </tbody>
                </Table>
                <nav>
                  <Row className="show-grid">
                    <Col md={9}>
                      <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={this.state.limit}
                        totalItemsCount={this.state.totalData}
                        pageRangeDisplayed={5}
                        onChange={this.pageChange}
                      />
                    </Col>
                    <Col  md={3} >
                      <span className="pull-right">Showing {this.state.showData} to {this.state.toData} of {this.state.totalData}</span>
                    </Col>
                  </Row>

                </nav>

                <Modal isOpen={this.state.deleteModal} toggle={this.btnDelete}
                       className={'modal-sm ' + this.props.className}>
                  <ModalHeader toggle={this.btnDelete} >Delete</ModalHeader>
                  <ModalBody>
                    Are You Sure?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.delete}>Ok</Button>{' '}
                    <Button color="secondary" onClick={this.btnDelete}>Cancel</Button>
                  </ModalFooter>
                </Modal>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default KecelakaanKerja;
