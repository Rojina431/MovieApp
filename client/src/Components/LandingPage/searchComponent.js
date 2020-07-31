import React ,{useState}from 'react';
import { Input ,Form, Button,Row} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux'

 function Search(props){

    const{isAuthenticated}=props
    const [search,setSearch]=useState('')

    const handleChange=(e)=>{
        setSearch(e.target.value)
    }

    const resetInputField=()=>{
        setSearch('')
    }

    const callSearchFunction=(e)=>{
      e.preventDefault();
      props.search(search);
      resetInputField();
    }
   
    if(isAuthenticated)
        {
            return(
                <Form className="m-1 search" >
        <Row>
          <div className="col-sm-11">
           <Input type="text"  placeholder="Search Movie" 
          
           onChange={handleChange}
           value={search}
           />
           </div>
           <div className="col-sm-1">
           <Button onClick={callSearchFunction} type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
           </div>
        </Row>
        </Form>
            )
        }
   else{
       return(
           <div className="container my-1" >
               <h4 style={{textAlign:"center" ,color:"Tan"}}>Login to search movie by name</h4>
           </div>
       )
   }
}

const mapStateToProps=state=>({
    isAuthenticated:state.users.isAuthenticated
})

export default connect(mapStateToProps)(Search)