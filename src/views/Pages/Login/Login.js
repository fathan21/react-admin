import React, {Component} from 'react';
import {Form,Alert,Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {Services}  from '../../../provider/Services';
class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {title:'login',disabled:false,apiUrl:'login',alert:{msg:'test',type:'info',open:false}};
      this.onSubmit = this.onSubmit.bind(this);
      this.alertDismiss = this.alertDismiss.bind(this);
      console.log(this.props);
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

        Services.postDefault(this.state.apiUrl,dataJson)
        .then((res) => {
          if(res.error){
            //alert(res.msg);
            this.setState({
              alert: {open:true,type:'danger',msg:res.msg},
            });
            return false;
          }
          let r = Services.getRedirect();

          localStorage.setItem('token_nanang', res.token);
          localStorage.setItem('full_name_nanang', res.full_name);

          if(r!=undefined && r!=null && r!=''){
            window.location.href = r;
          }else{
            this.props.history.push({
              pathname: '/dashboard',
            });
          }

          console.log(res);
        })
        .catch(error => alert('check your conection'));
  }
  alertDismiss(){
        this.setState({
              alert: {open:false},
        });
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Form id="myFrom" className="form-horizontal" onSubmit={this.onSubmit}>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h5>HSE-INDOFUJI</h5>
                      <Alert color={this.state.alert.type} isOpen={this.state.alert.open} toggle={this.alertDismiss}>
                        {this.state.alert.msg}
                      </Alert>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" id="username" placeholder="Username" required="required"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" required="required"  name="password" id="password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>
                  </CardBody>
                </Card>
              </CardGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
