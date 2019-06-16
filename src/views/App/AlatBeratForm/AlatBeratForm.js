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
import {Services,upperCase}  from '../../../provider/Services';
//datepickernpm
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AlatBeratForm extends Component {
  constructor(props) {
    super(props);
    this.state = {id:0,title:'alat_berat',action:'add',disabled:false,apiUrl:'alat_berat',alert:{msg:'test',type:'info',open:false},imagePreviewUrl:'',imageFile:'',
                    tgl_masuk:null,
                    date_format_display:'DD.MM.YYYY'
                  };
    this.onSubmit = this.onSubmit.bind(this);
    this.goToList = this.goToList.bind(this);
    this.alertDismiss = this.alertDismiss.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleDpSelect = this._handleDpSelect.bind(this);
    this._handleDpChange = this._handleDpChange.bind(this);

    this.store = this.store.bind(this);
    this.upload = this.upload.bind(this);
    //console.log(this.props);
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
    const scope = this;
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
      
      if(res.data['imagePreviewUrl']!=undefined && res.data['imagePreviewUrl']!='' && res.data['imagePreviewUrl']!=null ){
        this.setState({imagePreviewUrl:res.data['imagePreviewUrl']});
      }
      //datepciker
      if(res.data.tgl_masuk!=undefined && res.data.tgl_masuk!='' && res.data.tgl_masuk!=null ){
        let j = moment(res.data.tgl_masuk);
        this.setState({tgl_masuk:j});
      }
    })
    .catch(error =>{ console.error(error);alert('periksa koneksi anda')});
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target;
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
    // handle file 
    if(this.state.imageFile!='' && this.state.imageFile!=undefined && this.state.imageFile!=null){
      this.upload(this.state.imageFile,dataJson);
    }else{
      this.store(dataJson);
    }

  }
  store(dataJson){
    Services.store(this.state.apiUrl,dataJson,this.state.id)
    .then((res) => {
      if(res.error){
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
    })
    .catch(error => alert('check your conection'));
  }

  upload(file,dataJson){
    Services.upload(this.state.apiUrl+'/upload',file)
    .then((res) => {
      if(res.error){
        this.setState({
          alert: {open:true,type:'danger',msg:res.msg},
        });
        return false;
      }
      dataJson['photo'] = res.data.file_name;
      //console.log(dataJson);
      //return false;
      this.store(dataJson);
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
  //image 
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    const scope = this;
    reader.onloadend = () => {
      scope.setState({
        imageFile: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    const action = this.state.action;
    
    //pp
    let $imagePreview = null;
    let {imagePreviewUrl} = this.state;
    //console.log('prev='+imagePreviewUrl);
    if(imagePreviewUrl){
      $imagePreview = (<img src={imagePreviewUrl} />);
    }else{
      $imagePreview = (<div className="previewText">Plih gambar</div>);
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">

          <Card>
              <CardHeader>
                <strong>{upperCase(this.state.title)} {upperCase(this.state.action)}</strong>
                <Button type="button" color="default" onClick={() => this.goToList()}  className="float-right" size="sm"><i className="fa fa-arrow-left"></i>&nbsp; Back</Button>
              </CardHeader>
              <CardBody>

                  <Alert color={this.state.alert.type} isOpen={this.state.alert.open} toggle={this.alertDismiss}>
                    {this.state.alert.msg}
                  </Alert>
                <Form id="myFrom" className="form-horizontal" onSubmit={this.onSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="nama_alat">Nama Alat </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" name="nama_alat" id="nama_alat"   required  disabled={this.state.disabled}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="Model">Model</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" name="model" id="model"   required  disabled={this.state.disabled}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="nomer_seri">No. Seri</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" name="nomer_seri" id="nomer_seri"  disabled={this.state.disabled}/>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="tgl_pelaksanaan">Tgl Masuk</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <DatePicker
                              disabled={this.state.disabled}
                              selected={this.state.tgl_masuk}
                              value={this.state.tgl_masuk}
                              onSelect={(e)=>this._handleDpSelect(e,'tgl_masuk')}
                              onChange={(e)=>this._handleDpChange(e,'tgl_masuk')}
                              className="form-control"
                              placeholderText={this.state.dateFormat}
                              dateFormat={this.state.date_format_display}
                          />
                          <Input type="hidden" name="tgl_masuk" id="tgl_masuk"  disabled={this.state.disabled}/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="nama_perusahaan">Nama Perusahaan</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" name="nama_perusahaan" id="nama_perusahaan"  disabled={this.state.disabled}/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="nama_perusahaan">Operator</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" name="operator" id="operator"  disabled={this.state.disabled}/>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                </Form>
              </CardBody>
              <CardFooter>
                <Row style={{ display: this.state.disabled ? 'none' : '' }} >
                  <Col md="4"></Col>
                  <Col md="8">
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

export default AlatBeratForm;
