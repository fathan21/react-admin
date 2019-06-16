import React, {Component} from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import {Services}  from '../../provider/Services';

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  logout(){
    Services.post('logout',{})
    .then((res) => {
              if(res.error){
                alert(res.msg);
                return false;
              }
              localStorage.removeItem('token_nanang');
              localStorage.removeItem('full_name_nanang');
              window.location.href="#/login";

              console.log(res);
    }).catch(error => alert('check your conection'));
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="fa fa-user fa-2x" ></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={() => this.logout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {...attributes} = this.props;
    return (
      this.dropAccnt()
    );
  }
}

export default HeaderDropdown;
