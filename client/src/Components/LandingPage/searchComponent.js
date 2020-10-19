import React ,{useState}from 'react';
import { Input ,Form, Button,Row} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons';

 function Search(props){

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


export default (Search)