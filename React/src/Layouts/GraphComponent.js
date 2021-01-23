import '../App.css';
import React  from "react";
import {Form, Button, Col, Row} from 'react-bootstrap'

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

  
class GraphComp extends React.Component {

    constructor(props){
        super(props);
        this.state={
            chartData: []
        }
        
    }


    getChartData = () => {
        fetch('http://localhost:5000/api/getChart')
        .then((response) => response.json())
        .then((resData) => {
            let obj= new Object({
                day:"",
                Count: ""
            })
            let FinalData = resData.ChartData.map((data, i)=>{
                return {
                    count: data && data.length,
                    day: [...new Set(data ? data.map(item=> item.createdDate.split(":")[0].substring(0,10)): "")].toString()
                } 
            })
            this.setState({
                chartData: FinalData
            })
        })
    }
    
    render(){
        return (
            <div>
                <Button type="submit" className="mb-2"  onClick={this.getChartData}>
                    Show Chart
                </Button>
                <Row className={"margin_t_50"}>
                    <Col lg={"4"}>

                    </Col>
                    <Col lg={"4"}>
                    {
                        this.state.chartData &&
                        this.state.chartData.length !== 0 ?
                        <BarChart
                            width={500}
                            height={300}
                            data={this.state.chartData}
                            margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                            }}
                            barSize={20}
                        >
                            <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }} />
                            <YAxis /> 
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>: ""
                    }
                    </Col>

                    <Col lg={"4"}>

                    </Col>
                </Row>
                    

            </div>
            
          );
    }
}

export default GraphComp


