import '../App.css';
import React  from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import {Row, Col} from "react-bootstrap"

class FormLayout extends React.Component {

    constructor(props){
        super(props);
        this.state={
            name: this.props.fomData && this.props.fomData.name ?this.props.fomData.name : "",
            email: this.props.fomData && this.props.fomData.email ?this.props.fomData.email : "",
            salary: this.props.fomData && this.props.fomData.salary ?this.props.fomData.salary : "",
            designation: this.props.fomData && this.props.fomData.designation ?this.props.fomData.designation : "Frontend Developer",
            errors:{
                name: "",
                email: "",
            }
        }
    }

    componentDidMount = () =>{
        this.props.onChangeAction(this.state)
    }

    onChangeAction = (e) =>{
        const {id, value} = e.target;
        this.setState({
            [id]: value
        },()=>{
            this.props.onChangeAction(this.state)
        })
    }

    onClickSubmit = () => {
        if(this.handleValidation()) {
            this.props.onClickSubmit(this.props.modal ? "Edit" : "")
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

       //salary
       if(!fields["salary"]){
            formIsValid = false;
            errors["salary"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
   }

    onClear = () => {
        this.setState({
            name: "",
            email: "",
            salary: "",
            designation: "Frontend Developer",
        })
    }
    render(){
        return(
            <div>
                <Row className={"margin_50"}>
                    <Col lg={this.props.modal ? "1" : "4"}>
                    </Col>
                    
                    <Col lg={this.props.modal ? "10" : "4"}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className= {"displayflex"}>Name</Form.Label>
                            <Form.Control
                                id= "name"
                                value={this.state.name}
                                type="text" 
                                placeholder="Enter Your Name" 
                                onChange={this.onChangeAction}/>
                                {this.state.errors.name !== "" ?
                                <Form.Text className="codered ">
                                    {this.state.errors.name}
                                </Form.Text> : ""
                                }
                                
                        </Form.Group>

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
                                <Form.Text className="codered">
                                    {this.state.errors.email}
                                </Form.Text> : ""
                                }
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className= {"displayflex"}>Salary</Form.Label>
                            <Form.Control 
                                id="salary" 
                                value={this.state.salary}
                                type="number" 
                                placeholder="Enter Your Salary"
                                onChange={this.onChangeAction} />
                                {this.state.errors.salary !== "" ?
                                <Form.Text className="codered">
                                    {this.state.errors.salary}
                                </Form.Text> : ""
                                }
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label className= {"displayflex"}>Designation</Form.Label>
                            <Form.Control as="select"
                                id="designation"
                                value={this.state.designation}
                                onChange={this.onChangeAction}>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Designer</option>
                                <option>Software tester</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.onClickSubmit}>
                            Submit
                        </Button>

                        <Button variant="primary" type="submit" className = {"margin-left-20"} onClick={this.onClear}>
                            Clear
                        </Button>
                    </Col>

                    <Col lg={this.props.modal ? "1" : "4"}>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default FormLayout

