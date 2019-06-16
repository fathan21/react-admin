import React, {Component} from 'react';

import {CardColumns, Card, CardHeader, CardBody,
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardFooter,
  CardTitle,
  Button,
  Table,
  ButtonToolbar,
  ButtonGroup,
  Label,
  Input,
  Form,
  FormGroup,} from 'reactstrap';
  //datepickernpm
  import DatePicker from 'react-datepicker';
  import moment from 'moment';
  import 'react-datepicker/dist/react-datepicker.css';
  import {Services,dateFormat}  from '../../../provider/Services';

class KecelakaanKerjaReport extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this._handleDpSelect = this._handleDpSelect.bind(this);
    this._handleDpChange = this._handleDpChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onPrint = this.onPrint.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 4,
      apiUrl:'kecelakaanKerjaReport',
      start_date:null,end_date:null,
      date_format_display:'DD.MM.YYYY',
      displayFilter:'inline',
      data:{data:[],total:[]}
    };
  }
  componentWillMount(){
    //this.onSubmit();
  }

  onClear(){
    this.setState({
        start_date:null,
        end_date:null
    });
    let oFormObject = document.forms['myFrom'];
    oFormObject.elements.start_date.value = null;
    oFormObject.elements.end_date.value = null;

  }
  onPrint(){
      var printContents = document.getElementById('print_area').innerHTML;
      var popupWin = window.open('', '_blank', 'width=500,height=500');
      popupWin.document.open();
      popupWin.document.write(`<html><head><title>report</title>
        <style type="text/css">
                  table{
                        border-spacing:0px !important;
                  }


                </style>
        </head><body onload="window.print()">` + printContents + '</html>');
      popupWin.document.close();
  }
  onSubmit() {
      this.setState({cartData:[]});
      const form = document.forms['myFrom'];
      const data = new FormData(form);
      const dataJson = {};

      for (let name of data.keys()) {
        const input = form.elements[name];
        if(input.length > 1){
          //console.log(input.value);
          if(input.value!=undefined && input.value!=null && input.value!=''){
            dataJson[name] = input.value;
          }
          continue;
        }
        if(data.get(name)=='' || data.get(name)==undefined || data.get(name)==null){
          continue;
        }

        const parserName = input.dataset.parse;
        if (parserName) {
          const parser = inputParsers[parserName];
          const parsedValue = parser(data.get(name));
          data.set(name, parsedValue);
          dataJson[name] =   data.get(parsedValue);
        }else{
          dataJson[name] =   data.get(name);
        }
    }
    dataJson.type=this.state.radioSelected;

    Services.get(this.state.apiUrl,dataJson)
    .then((res) => {
      if(res.error){

        return false;
      }
      console.log(res);
      this.setState({data:{data:res.data.data,total:res.data.total}});

    })
    .catch(error => alert('check your conection'));
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
    this.onSubmit();
  }
  //dp
  _handleDpChange(e,key){
  }

  _handleDpSelect(e,key){
    if (e !=null) {
      this.setState({
        [key]: e
      });
      let oFormObject = document.forms['myFrom'];
      oFormObject.elements[key].value = moment(e).format('YYYY-MM-DD');
    }else{
        this.setState({
          [key]: null
        });
      let oFormObject = document.forms['myFrom'];
      oFormObject.elements[key].value = null;
    }
  }
  render() {

    const rows = this.state.data;
    return (
      <div className="animated fadeIn">
          <Card className="border-primary">
            <CardHeader>
              Kecelakaan Kerja Report
            </CardHeader>
            <CardBody>
                <Row style={{ display: this.props.displayFilter}}>
                  <Col sm="12">
                      <Form id="myFrom"  onSubmit={this.onSubmit} inline>
                        <FormGroup className="pr-1">
                          <Label htmlFor="exampleInputName2" className="pr-1">Tgl Dari</Label>
                          <DatePicker
                              selected={this.state.start_date}
                              value={this.state.start_date}
                              onSelect={(e)=>this._handleDpSelect(e,'start_date')}
                              onChange={(e)=>this._handleDpChange(e,'start_date')}
                              className="pr-1"
                              placeholderText={this.state.dateFormat}
                              dateFormat={this.state.date_format_display}
                          />
                          <Input type="hidden" name="start_date" id="start_date"/>
                        </FormGroup>
                        <FormGroup className="pr-1">
                          <Label htmlFor="exampleInputEmail2" className="pr-1">Tgl Sampai</Label>
                            <DatePicker
                                selected={this.state.end_date}
                                value={this.state.end_date}
                                onSelect={(e)=>this._handleDpSelect(e,'end_date')}
                                onChange={(e)=>this._handleDpChange(e,'end_date')}
                                className="pr-1"
                                placeholderText={this.state.dateFormat}
                                dateFormat={this.state.date_format_display}
                            />
                          <Input type="hidden" name="end_date" id="end_date"/>
                        </FormGroup>
                        <FormGroup className="pr-1">
                          <Button type="button" size="sm" color="primary" onClick={() => this.onSubmit()} ><i className="fa fa-dot-circle-o"></i> Submit</Button>
                          <Button type="button" size="sm" color="info" onClick={() => this.onPrint()}><i className="fa fa-print"></i> Print</Button>
                        </FormGroup>
                      </Form>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    &nbsp;
                  </Col>
                </Row>
              <div className="chart-wrapper" id="print_area">
                <table  width="100%">
                  <tr><td align="center"><h3>Laporan Kecelakaan Kerja</h3></td></tr>
                    <tr><td >tanggal cetak: {dateFormat(moment(new Date()).format('YYYY-MM-DD'))}</td></tr>
                </table>
                <table  className="table-report" border="1" width="100%" align="center">

                    <tr  style={{backgroundColor:'#cccccc'}}>
                      <td  align="center">Tanggal</td>
                      <td  align="center">no first aid</td>
                      <td  align="center">no fatality</td>
                      <td  align="center">no medical case</td>
                      <td  align="center">no nears miss</td>
                      <td  align="center">no fire</td>
                      <td  align="center">equipment incident</td>
                      <td  align="center">auto mobile ancident</td>
                      <td  align="center">environmental accident</td>
                      <td  align="center">unsafe condition</td>
                      <td  align="center">unsafe action</td>
                    </tr>
                    {this.state.data.data.map(function(item, key) {
                       return (
                          <tr key = {key}>
                              <td align="center">{dateFormat(item.tgl)}</td>
                              <td  align="center">{item.no_first_aid}</td>
                              <td  align="center">{item.no_fatality}</td>
                              <td  align="center">{item.no_medical_case}</td>
                              <td  align="center">{item.no_nears_miss}</td>
                              <td  align="center">{item.no_fire}</td>
                              <td  align="center">{item.equipment_incident}</td>
                              <td  align="center">{item.auto_mobile_ancident}</td>
                              <td  align="center">{item.environmental_accident}</td>
                              <td  align="center">{item.unsafe_condition}</td>
                              <td  align="center">{item.unsafe_action}</td>
                          </tr>
                        )
                     })}
                     <tr>
                       <td><b>Total</b></td>

                         <td  align="center">{this.state.data.total.no_first_aid}</td>
                         <td  align="center">{this.state.data.total.no_fatality}</td>
                         <td  align="center">{this.state.data.total.no_medical_case}</td>
                         <td  align="center">{this.state.data.total.no_nears_miss}</td>
                         <td  align="center">{this.state.data.total.no_fire}</td>
                         <td  align="center">{this.state.data.total.equipment_incident}</td>
                         <td  align="center">{this.state.data.total.auto_mobile_ancident}</td>
                         <td  align="center">{this.state.data.total.environmental_accident}</td>
                         <td  align="center">{this.state.data.total.unsafe_condition}</td>
                         <td  align="center">{this.state.data.total.unsafe_action}</td>
                     </tr>

                </table>
              </div>
            </CardBody>
          </Card>
      </div>
    )
  }
}

export default KecelakaanKerjaReport;
