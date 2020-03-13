import React, { Component } from 'react'
import Header from './Header'
import {Form, Button} from 'react-bootstrap';
import ApiService from '../services/ApiService'

class EditHouse extends Component {
constructor(props) {
    super(props)

    this.state = {
        id:'',
        houseDescription:'',
        ownerName:'',
        location:'',
        noOfFloor:'',
        landArea:'',
        estimateCost:'',
        isSold:''
    }
}


componentDidMount(){
    this.loadDetails();
}

loadDetails = () =>{
    ApiService.getById(window.localStorage.getItem("id"))
    .then(res =>{
        let houseDetails = res.data;
        this.setState({
            id : houseDetails.id,
            houseDescription: houseDetails.houseDescription ,
            ownerName: houseDetails.ownerName ,
            location: houseDetails.location ,
            noOfFloor: houseDetails.noOfFloor ,
            landArea: houseDetails.landArea ,
            estimateCost: houseDetails.estimateCost ,
            isSold: houseDetails.isSold 
        })
    })
}

handleChange = (event) =>{
    this.setState({
        [event.target.name]:event.target.value
    })
} 

saveChange = (e) => {
    e.preventDefault();
    let details ={
        id : this.state.id,
        houseDescription:this.state.houseDescription,
        ownerName:this.state.ownerName,
        location:this.state.location,
        noOfFloor:this.state.noOfFloor,
        landArea:this.state.landArea,
        estimateCost:this.state.estimateCost,
        isSold:this.state.isSold
    }
    ApiService.updateHouse(details)
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
                        <h4 className="text-center mb-4">Update your house information? Update it now!!</h4>
                        <Form>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter Description of house" 
                                name="houseDescription" value={this.state.houseDescription} 
                                onChange={this.handleChange} 
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Control 
                                type="text" placeholder="Enter your Full Name"  
                                name="ownerName" value={this.state.ownerName}
                                onChange={this.handleChange}
                                />
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
                        <Button className="savechange-btn" variant="outline-info" onClick={this.saveChange}>Save Change</Button>
          
                    </div>
                </div>           
            </div>
        )
    }
}

export default EditHouse
