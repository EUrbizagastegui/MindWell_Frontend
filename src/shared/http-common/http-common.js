import axios from "axios";

export default axios.create({
    baseURL: 'https://mindwell-apigateway-fundamentos.azurewebsites.net',
    headers: { 'Content-type': 'application/json' }
});