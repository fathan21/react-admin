import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Radar} from 'react-chartjs-2';
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
  import {Services}  from '../../../provider/Services';

class IzinKerjaChart extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this._handleDpSelect = this._handleDpSelect.bind(this);
    this._handleDpChange = this._handleDpChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 4,
      apiUrl:'izinKerjaChart',
      start_date:null,end_date:null,
      date_format_display:'DD.MM.YYYY',
      cartLabel:[],
      cartData:[]
    };
  }
  componentWillMount(){
    this.onSubmit();
  }

  onClear(){
    this.setState({
        start_date:null,
        end_date:null
    });
    let oFormObject = document.forms['myFrom'];
    oFormObject.elements.start_date.value = null;
    oFormObject.elements.end_date.value = null;
    this.onSubmit();
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
          //console.log(dataJson);
          //return false;
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
        //alert('check your conection');
        return false;
      }
      //console.log(res);
      this.setState({
            cartData:res.data,
            cartLabel:res.label
      });
      //console.log(this.state.cartData);

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

    const bar = {
      labels: this.state.cartLabel,
      datasets: this.state.cartData
    };
    return (
      <div className="animated fadeIn">
          <Card className="border-secondary">
            <CardHeader>
              Izin Kerja Graphic
            </CardHeader>
            <CardBody>
                <Row style={{ display: this.props.displayFilter}}>
                  <Col sm="12">
                      <Form id="myFrom"  onSubmit={this.onSubmit} inline>
                        <FormGroup className="pr-1">
                          <Label htmlFor="exampleInputName2" className="pr-1">Tgl Pelaksanaan Dari</Label>
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
                          <Label htmlFor="exampleInputEmail2" className="pr-1">Tgl Pelaksanaan Sampai</Label>
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
                          <Button type="reset" size="sm" color="danger" onClick={() => this.onClear()}><i className="fa fa-ban"></i> Reset</Button>
                        </FormGroup>
                      </Form>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    &nbsp;
                  </Col>
                </Row>
              <div className="chart-wrapper" >
                <Bar data={bar}
                     options={{
                  maintainAspectRatio: false
                }}
                />
              </div>
            </CardBody>
          </Card>
      </div>
    )
  }
}

export default IzinKerjaChart;
