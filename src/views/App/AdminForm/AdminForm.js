import React, {Component} from 'react';
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Collapse,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Grid,
  Alert,
} from 'reactstrap';
import {Services}  from '../../../provider/Services';

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {id:0,title:'admin',action:'add',disabled:false,apiUrl:'user',alert:{msg:'test',type:'info',open:false}};
    this.onSubmit = this.onSubmit.bind(this);
    this.goToList = this.goToList.bind(this);
    this.alertDismiss = this.alertDismiss.bind(this);
    console.log(this.props);
  }

  componentWillMount(){
    if(this.props.location.search=='' || this.props.location.search==undefined){
      return false;
    }
    let params = Services.parseQueryParams(this.props.location.search);
    if(params.id!=undefined && params.id >0){
      this.setState({id:params.id,action:params.action,data:{}});
      if(params.action=='view'){
        this.setState({disabled:true});
      }
      this.get(params.id);
    }
  }
  componentWillUnmount(){
    //ubort ahax next
  }

  get(id){
    Services.get(this.state.apiUrl+'/'+id,{})
    .then((res) => {
      if(res.error){
        alert(res.msg);
        return false;
      }
      let oFormObject = document.forms['myFrom'];
      for (var key in res.data) {
          if (res.data.hasOwnProperty(key)) {
              //console.log(key + " -> " + res.data[key]);
              if(oFormObject.elements[key]== undefined){
                continue;
              }
              oFormObject.elements[key].value = res.data[key];
          }
      }
    })
    .catch(error => console.error(error));
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const dataJson = {};

    for (let name of data.keys()) {
      const input = form.elements[name];
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

    Services.store(this.state.apiUrl,dataJson,this.state.id)
    .then((res) => {
      if(res.error){
        //alert(res.msg);
        this.setState({
          alert: {open:true,type:'danger',msg:res.msg},
        });
        return false;
      }
      var msg = this.state.id==0? 'data berhasil di tambah':'data berhasil di perbaruhi';


      this.props.history.push({
        pathname: '/'+this.state.title+'/list',
        search: '?alert_type=info&msg='+msg,
        //state: {  }
      });

      console.log(res);
    })
    .catch(error => alert('check your conection'));
  }

  alertDismiss(){
    this.setState({
          alert: {open:false},
    });
  }
  goToList(){

    this.props.history.push({
      pathname: '/'+this.state.title+'/list',
      search: '',
      //state: {  }
    });
  }


  render() {
    const action = this.state.action;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">

          <Card>
              <CardHeader>
                <strong>{this.state.title} {this.state.action}</strong>
                <Button type="button" color="default" onClick={() => this.goToList()}  className="float-right" size="sm"><i className="fa fa-arrow-left"></i>&nbsp; Back</Button>
              </CardHeader>
              <CardBody>

                  <Alert color={this.state.alert.type} isOpen={this.state.alert.open} toggle={this.alertDismiss}>
                    {this.state.alert.msg}
                  </Alert>
                <Form id="myFrom" className="form-horizontal" onSubmit={this.onSubmit}>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="username">Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="username" id="username"   required  disabled={this.state.disabled}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" name="password" id="password"   required  disabled={this.state.disabled}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="full_name">Nama</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="full_name" id="full_name"   required  disabled={this.state.disabled}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" name="email" id="email"   required  disabled={this.state.disabled}/>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
              <CardFooter>
                <Row style={{ display: this.state.disabled ? 'none' : '' }} >
                  <Col md="3"></Col>
                  <Col md="9">
                    <Button form="myFrom" type="submit" size="sm" color="primary" className="text-center"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger" className="text-center"><i className="fa fa-ban"></i> Reset</Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AdminForm;
