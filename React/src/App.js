import React  from "react";
import './App.css';
import Layout from "./Layouts/formLayout";
import SearchBar from "./Layouts/SearchBar";
import TableLayout from "./Layouts/Table"
import {Modal, Button} from "react-bootstrap"



class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      tableData:[],
      clearStatus: false,
      modelStatus: false,
      fomData: ""
    }
  }

  onChangeAction = (data) => {
    this.setState({
      data,
      clearStatus: false
    })
  }

  componentDidMount = () => {
    this.getAllData()
  }


  getAllData = () => {
    fetch('http://localhost:5000/api/getAll')
      .then((response) => response.json())
      .then((resData) => {
        this.setState({
          tableData: resData.userdata,
          clearStatus: true,
        },()=>{
          this.close()
        })
      })
  }

  onClickSubmit = (status) => { 
    let methodes = (status === "Edit" ? 'PUT' :'POST')
    fetch(  
      (status === "Edit" ? 
      'http://localhost:5000/api/update/' + this.state.editStatusId 
      :'http://localhost:5000/api/register') , {
    method: methodes ,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify( this.state.data )
    })
    .then(response =>  response.json())
    .then(resData => {
        if(resData.success){
            this.setState({ 
                name: "",
                email: "",
                salary: "",
                designation: "Frontend Developer"
            },()=>{
                // fetch('http://localhost:5000/api/getAll')
                //     .then((response) => response.json())
                //     .then((resData) => {
                //       this.setState({
                //         tableData: resData.userdata,
                //         clearStatus: true
                //       },()=>{
                //         this.close()
                //       })
                //     })
                this.getAllData()
            });
        }else if(resData.err){
            alert(resData.err)
        }else if(resData.errors){
            alert(resData.errors ? "Please fill the details" : "")
        }
    })
  }

  onDelete = (id) => {
    fetch('http://localhost:5000/api/delete/' + id, {
      method: 'DELETE'
      })
      .then(response => response.json())
      .then(response =>{ 
        if(response.success){
          this.getAllData()
        }else{
          alert("data is not deleted please try again")
        }
      })
  }

  onEdit = (id) =>{
    let content = this.state.tableData
    var item = content.find(item => item._id === id);
    this.setState({
      editStatusId : id,
      modelStatus: true,
      fomData: item
    })
  }

  close = () => {
    this.setState({
      editStatusId : "",
      modelStatus: false,
      fomData: ""
    })
  }


  onClickSearch = () =>{
    fetch('http://localhost:5000/api/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.data),
    })
    .then((response) => response.json())
    .then((resData) => {
      this.setState({
        tableData: resData.result,
      })
    })
  }

  render(){
    return (
      <div className="App">
          <Layout 
            onClickSubmit = {this.onClickSubmit}
            onChangeAction = {this.onChangeAction}
            modal = {false}/>
          <SearchBar
            onChangeAction = {this.onChangeAction}
            onClickSearch = {this.onClickSearch}
            getAllData = {this.getAllData}/>
          <TableLayout
            tableData = {this.state.tableData}
            onDelete = {this.onDelete}
            onEdit = {this.onEdit}
          />

          {/* Modal */}
          <Modal show={this.state.modelStatus} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <Layout 
                onClickSubmit = {this.onClickSubmit}
                onChangeAction = {this.onChangeAction}
                onEditClickSubmit = {this.onEditClickSubmit}
                modal = {true}
                fomData= {this.state.fomData !== "" ? this.state.fomData : false}/>
            </Modal.Body>
          </Modal>
      </div>
    );
  }

}
export default App;
