import React,{Component,Fragment} from 'react';
import {NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import {logout} from '../../../redux/authAction';

class Logout extends Component{


    render(){
        
        return(
            <Fragment>
              <NavLink onClick={this.props.logout} href="#" style={{color:'white'}} >
              <span className="fa fa-sign-out fa-lg"></span> Logout</NavLink>
            </Fragment>
            
        )
    }
}



export default connect(null,{logout})(Logout);