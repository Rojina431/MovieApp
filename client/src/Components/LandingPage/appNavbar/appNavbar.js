import React,{Component,Fragment} from 'react';
import {NavbarToggler,Collapse,Navbar,Nav,NavItem,NavbarBrand,FormGroup,Input} from 'reactstrap';
import RegisterModal from './registerModal';
import LoginModal from './loginModal';
import Logout from './logout';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo,faSearch} from '@fortawesome/free-solid-svg-icons';
/// ...

export class AppNavbar extends Component{
   state={
       isOpen:false
   }

    toggle=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
      const{isAuthenticated}=this.props.auth

        const authLinks=(
                <Fragment>
                  {/*<NavItem>
                    <span className="navbar-text mr-3"/>
                  {user&&   <Strong>{ user?`Welcome ${user.name}`:''}</Strong>}
                  </NavItem>*/}
                   <NavItem>
                     <Logout/>
                   </NavItem>
                </Fragment>
            )
        
            const guestLinks=(
            <Fragment>
              <NavItem>
                   <RegisterModal/>
              </NavItem>
              <NavItem>
                  <LoginModal/>
              </NavItem>  
            </Fragment>
            )
        
        return(
             <div>
            
               <Navbar style={{color:"white"}} light expand='sm'> 
                <NavbarBrand href="/"><span><FontAwesomeIcon icon={faVideo} className="mr-2"/></span> Movie App</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto" navbar>
                       {isAuthenticated ? authLinks:guestLinks}
                     </Nav>
                    </Collapse>
                
                </Navbar>
             </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.users
})

export default connect(mapStateToProps)(AppNavbar);