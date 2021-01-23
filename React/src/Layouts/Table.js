import '../App.css';
import React  from "react";
import Table from 'react-bootstrap/Table'
import {Row, Col} from "react-bootstrap"

class TableLayout extends React.Component {

    constructor(props){
        super(props);
        this.state={

        }
    }

    onDelete = (id) =>{
        this.props.onDelete(id)
    }

    onEdit = (id) =>{
        this.props.onEdit(id)
    }

    render(){
        return(
            <div>
                    <Row className={"margin_50"}>
                        <Col lg={"1"}>
                        </Col>
                        
                        <Col lg={"10"}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Salary</th>
                                <th>Designation</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.tableData 
                                && this.props.tableData.length !== 0  ?  
                                this.props.tableData.map((data, i)=>(
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.salary}</td>
                                    <td>{data.designation}</td>
                                    <td>
                                        <button onClick={()=>{this.onEdit(data._id)}} >Edit</button> / <button onClick={()=>{this.onDelete(data._id)}}>Delete</button>
                                    </td>
                                </tr>
                                )) : 
                                <tr>
                                    <td colSpan="5"> No Record found</td>
                                </tr>}
                            </tbody>
                            </Table>
                        </Col>

                        <Col lg={"1"}>
                        </Col>
                    </Row> 
            </div>
        )
    }
}

export default TableLayout

