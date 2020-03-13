import axios from 'axios';

const HOUSE_API_URL ='http://localhost:8080/api/house';

class ApiService {    


    getAllList(){
        return axios.get( HOUSE_API_URL);
    } 

    getById(id){
        return axios.get( HOUSE_API_URL + '/' + id);
    }
    
    getByLocation(location){
        return axios.post( HOUSE_API_URL + '/' + location);
    }
    getByAreaAndFloor(landArea, noOfFloor){
        return axios.post( HOUSE_API_URL + '/area'+ '/' + landArea + '/floor' +'/'+ noOfFloor);
    }

    getByIsSold(isSold){
        return axios.post(HOUSE_API_URL + '/sold'+'/' + isSold);
    }

    getByMinMaxCost(costfilter){
        return axios.post(HOUSE_API_URL + '/costfilter', costfilter);
    }

    addHouse(details){
        return axios.post(HOUSE_API_URL , details);
    }
    
    deleteHouse(id){
        return axios.delete(HOUSE_API_URL +'/' + id);
    }

    updateHouse(houseDetails){
        return axios.put(HOUSE_API_URL + '/' + houseDetails.id , houseDetails)
    }


}

export default new ApiService();

    


