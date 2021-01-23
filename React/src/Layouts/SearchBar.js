import '../App.css';
import React  from "react";
import {Row, Col, Form, Button} from 'react-bootstrap'

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state={
            name: "",
            email: "",
            errors:{
                name: "",
                email: "",
            }
        }
    }

    handleValidation(){
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }else if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Only letters";
           }        
        }
   
        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }else if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
   }

    onClickSearch = (data) => {
        if(this.handleValidation())
        {
            this.props.onClickSearch(data)
        }
    }

    onChangeAction = (e) =>{
        const {id, value} = e.target;
        this.setState({
            [id]: value
        },()=>{
            this.props.onChangeAction(this.state)
        })
    }

    onClear = () =>{
        this.setState({
            name: "",
            email: "",
        },()=>{
            this.props.onChangeAction(this.state)
            this.props.getAllData()
        })
    }

    render(){
        return(
            <div>
                <Row className={"margin_50"}>
                    <Col lg={"3"}>
                    </Col>
                    <Col lg={"6"}>
                            <Form.Row className="align-items-center">
                                <Row lg={"12"}>
                                    <Col lg={"4"}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className= {"displayflex"}>Name</Form.Label>
                                            <Form.Control 
                                                id= "name"
                                                value={this.state.name}
                                                type="text" 
                                                placeholder="Enter Your Name"
                                                onChange={this.onChangeAction} />
                                                {this.state.errors.name !== "" ?
                                                <Form.Text className="codered ">
                                                    {this.state.errors.name}
                                                </Form.Text> : ""
                                                }
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col lg={"4"}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className= {"displayflex"}>Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                value={this.state.email} 
                                                type="email" 
                                                placeholder="Enter Your email" 
                                                onChange={this.onChangeAction}
                                            />
                                            {this.state.errors.email !== "" ?
                                            <Form.Text className="codered ">
                                                {this.state.errors.email}
                                            </Form.Text> : ""
                                            }
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col lg={"4"} className={"margin_t_30"}> 
                                    <Button type="submit" className="mb-2"  onClick={()=>this.onClickSearch("search")}>
                                        Search
                                    </Button>
                                    <Button variant="primary" type="submit" className = {"margin-left-20"} onClick={this.onClear}>
                                        Clear 
                                    </Button>
                                    </Col>
                                   
                                </Row>
                            </Form.Row>
                    </Col>
                    <Col lg={"3"}>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SearchBar

