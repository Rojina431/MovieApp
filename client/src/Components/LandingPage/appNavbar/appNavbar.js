import React,{Component,Fragment} from 'react';
import {NavbarToggler,Collapse,Navbar,Nav,NavItem,NavbarBrand,NavLink} from 'reactstrap';
import RegisterModal from './registerModal';
import LoginModal from './loginModal';
import Logout from './logout';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo} from '@fortawesome/free-solid-svg-icons';

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
                  <NavItem>
                    <span className="navbar-text mr-3">
                    { <h4>{'Welcome'}</h4> }  
                    </span>
                  </NavItem>
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
            
               <Navbar color="dark" dark expand='sm' > 
                <NavbarBrand href="/"><span><FontAwesomeIcon icon={faVideo} className="mr-2"/></span> Movie App</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="mr-auto " navbar>
                 <NavItem>
                     <NavLink className="nav-link" key="favorites">
                        <a href='/favorites' style={{color:'white'}} className=" m-4"className="mr-auto mt-2"> <span className="fa fa-heart fa-lg"></span> My Favorites</a>
                 </NavLink>
                 </NavItem>
                     </Nav>
                     <Nav className="ml-auto mt-2" navbar>
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