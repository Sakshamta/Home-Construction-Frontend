import React, { Component } from 'react';
import Header from './Header';
import {Form, Button} from 'react-bootstrap';
import ApiService from '../services/ApiService';
// import ApiService from '../services/ApiService';


class AddHouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            houseDescription:'',
            ownerName:'',
            location:'',
            noOfFloor:'',
            landArea:'',
            estimateCost:'',
            isSold:''
        }
        this.handleChane = this.handleChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    saveChange = (e) => {
        e.preventDefault();
        let details ={
            houseDescription:this.state.houseDescription,
            ownerName:this.state.ownerName,
            location:this.state.location,
            noOfFloor:this.state.noOfFloor,
            landArea:this.state.landArea,
            estimateCost:this.state.estimateCost,
            isSold:this.state.isSold
        }
        ApiService.addHouse(details)
        .then((res) => {
            this.props.history.push('/home');
        })     
    }
    
    
    
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="add-house p80">

                        <h4 className="text-center mb-4">Add your house in sale? Add it now!!</h4>
                        <Form>
                            <Form.Group >
                                <Form.Control type="text" placeholder="Enter Description of house" name="houseDescription" value={this.state.houseDescription} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter your Full Name"  
                                name="ownerName" value={this.state.ownerName} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter your Location" 
                                name="location" value={this.state.location} 
                                onChange={this.handleChange} 
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter Number of floor"  
                                name="noOfFloor" value={this.state.noOfFloor} 
                                onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter a land area" 
                                name="landArea" value={this.state.landArea} 
                                onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter Estimated Cost" 
                                name="estimateCost" value={this.state.estimateCost} 
                                onChange={this.handleChange} 
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="Boolean" placeholder="Sold Or Not" 
                                name="isSold" value={this.state.isSold} 
                                onChange={this.handleChange} 
                                />
                            </Form.Group>
                            
                        </Form>
                        <Button className="add-btn" variant="outline-info" onClick={this.saveChange}>Add</Button>
          
                    </div>
                </div>
           
            </div>
         
        )
    }
}

export default AddHouse
