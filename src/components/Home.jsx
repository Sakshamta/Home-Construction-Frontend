import React, { Component } from 'react'
import Header from './Header'
import {Card, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import ApiService from '../services/ApiService';
import {RotateSpinner } from "react-spinners-kit";


class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           details:[],
           sold:'Sold',
           notSold : 'House in Sale', 
           loading: false,
           message:'',
           costfilter :
               {
                   minEstimatedCost : 0,
                   maxEstimatedCost : 0
               }            
            }
        
        this.loadHouseDetail = this.loadHouseDetail.bind(this);        
    }

    componentDidMount(){
        this.setState({ loading: true });
        this.loadHouseDetail();
        setTimeout(()=>{
            this.setState({
                loading : false
            })
        }, 1000)

    }

    loadHouseDetail(){
        ApiService.getAllList()
        .then((res) => {
            this.setState({details: res.data} );
            console.log(res); 
        })

    } 
//EDIT HOUSE DETAILS 
    editHouse(id){
        window.localStorage.setItem("id", id);
        this.props.history.push('/edit');        
    }

//DELECT HOUSE DETAILS
    deleteHouse(id){
        ApiService.deleteHouse(id)
        .then(res=>{
            this.setState({
                details :this.state.details.filter(houseDetails => houseDetails.id !== id)
            })
        })
        .catch(err => {

        })
    }    
// ON CHANGE 
    handleChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value}); 
    }

//WITH LOCATION
    listByLocation = (location) =>{
        this.setState({ loading: true });
        
        ApiService.getByLocation(location)
        .then((res)=>{
            if(!res.data.length){
                this.setState({
                    message : `No house found in ${location}`
                })
                console.log( this.state.message)
            }else{ 
                this.setState({details : res.data});
            }
        })
        
        setTimeout(()=>{
            this.setState({
                loading : false
            })
        }, 1000)
    }

    //WITH FLOORS AND AREAS
    listByAreaAndFloor = (landArea, noOfFloor) =>{
        this.setState({ loading: true });
        ApiService.getByAreaAndFloor(landArea, noOfFloor)
        .then((res)=>{
            this.setState({details : res.data});
            console.log(res);           
        })
        setTimeout(()=>{
            this.setState({
                loading : false
            })
        }, 1000)
    }

    //LIST IN SALES
    listByisSold = (isSold) =>{
        this.setState({ loading: true });
        ApiService. getByIsSold(isSold)
        .then((res)=>{
            this.setState({details : res.data});
            console.log(res);   
       })
       setTimeout(()=>{
        this.setState({
            loading : false
        })
    }, 1000)
    }

    //LIST WITH MAX AND MIN
    listWithMinMaxValue =()=>{
        let costfilter = {
            minEstimatedCost: this.state.minEstimatedCost,
            maxEstimatedCost: this.state.maxEstimatedCost
        }
        ApiService.getByMinMaxCost(costfilter)  
        .then((res) =>{
            this.setState({details: res.data});
        } )
    }

    
    render() {
        const { loading } = this.state;
        return (
            <div>
              <Header/>
                <div className="filter container p80">
                    <div className="row">
                        <div className="col-lg-4">
                            <h4>Filters and Refine</h4>                        
                            <div className="location mt-4">
                                <h5>Search with a location</h5>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder="Search with location"
                                    aria-label="Search with location"
                                    aria-describedby="basic-addon2"
                                    name = "location"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    />                                    
                                    <Button className="ml-2" variant="outline-info" onClick={()=>this.listByLocation(this.state.location)}>
                                        Search
                                    </Button>
                                </InputGroup> 
                            </div>
                            <div className="floor mt-4">
                                <h5 >Search with number of floor and land area</h5>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    className="mr-2"
                                    type="number"
                                    placeholder="Floor"
                                    aria-label="Floor"
                                    aria-describedby="basic-addon2"
                                    name = "noOfFloor"
                                    value={this.state.noOfFloor}
                                    onChange={this.handleChange}
                                    />
                                    <FormControl
                                    type="number"
                                    placeholder="Area "
                                    aria-label="Area "
                                    aria-describedby="basic-addon2"
                                    name = "landArea"
                                    value={this.state.landArea}
                                    onChange={this.handleChange}
                                    />      
                                    <Button className="ml-2" variant="outline-info" onClick={()=>this.listByAreaAndFloor(this.state.landArea, this.state.noOfFloor)}>Search</Button>                      
                                </InputGroup>                              
                            </div>
                            <div className="sold-or-not mt-4">
                                <h5>Check list with sold and unsold houses.</h5>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isSold" id="exampleRadios1" value="true" onChange={this.handleChange} onClick ={()=>this.listByisSold(true)}/>
                                     Sold                                                                       
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="isSold" id="exampleRadios2" value="false" onChange={this.handleChange}  onClick ={()=>this.listByisSold(false)} />
                                    In-sale                                   
                                </div>
                            </div>
                            <div className="min-max mt-4">
                            <h5 >Search with estimiated cost </h5>
                                <InputGroup className="mb-3">
                                    <FormControl
                                    className="mr-2"
                                    type="number"
                                    placeholder="MIN VALUE"
                                    aria-label="MIN VALUE"
                                    aria-describedby="basic-addon2"
                                    name = "minEstimatedCost"
                                    value={this.state.minEstimatedCost}
                                    onChange={this.handleChange}
                                    />
                                    <FormControl
                                    type="number"
                                    placeholder="MAX VALUE "
                                    aria-label="MAX VALUE "
                                    aria-describedby="basic-addon2"
                                    name = "maxEstimatedCost"
                                    value={this.state.maxEstimatedCost}
                                    onChange={this.handleChange}
                                    />  
                                    <Button className="ml-2" variant="outline-info" onClick={this.listWithMinMaxValue}>Click to search</Button>
                                    {/* <Spinner animation="border" /> */}
                               </InputGroup>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="house-list">
                                <h4 className="text-center mb-4">
                                    House details list
                                </h4> 
                                <h1>{this.state.message}</h1>                             
                                {loading && <RotateSpinner size={30} color="#17A2B8"/> }    
                                {!loading && this.state.details.map(
                                    houseDetails =>(
                                    <Card key ={houseDetails.id}>                       
                                    <Card.Body >                     
                                    <Card.Subtitle className="mb-2 text-muted ">{houseDetails.houseDescription}</Card.Subtitle>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <ul>
                                                    <li>Owner Name : {houseDetails.ownerName}</li>
                                                    <li>Location : {houseDetails.location}</li>
                                                    <li>Number of floors : {houseDetails.noOfFloor}</li>
                                                    <li>Land Area : {houseDetails.landArea} sq. ft</li>                      
                                                </ul>
                                            </div>
                                            <div className="col-lg-6">
                                                    <ul>
                                                        <li className="isSold">{ houseDetails.isSold === true? this.state.sold : this.state.notSold }</li>
                                                        <li>Estimated Cost ::{houseDetails.estimateCost}</li>
                                                    </ul>
                                            </div>
                                        </div>
                                        <ul>
                                            <li><Button className="delete-btn" variant="outline-info" onClick={()=>this.deleteHouse(houseDetails.id)}> Delete</Button> </li>
                                            <li><Button className="edit-btn" variant="outline-info" onClick={()=>this.editHouse(houseDetails.id)}> Edit</Button> </li>
                                        </ul>   
                                        
                                                                       
                                    </Card.Body>
                                </Card>
                                ))}
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Home

