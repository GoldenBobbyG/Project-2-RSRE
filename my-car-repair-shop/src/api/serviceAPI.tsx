import { ServiceData } from "../interfaces/ServiceData";
import { ServiceUpdate } from "../interfaces/ServiceUpdate";

const retrieveServices = async () => {
    try {
        const response = await fetch('/api/service', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid user API response, check network tab!'); 
        }

        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
}

const retrieveService = async (id: number | undefined) => {
    try {
        const response = await fetch(`/api/service/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab!');
        }
        return data;
    } catch (err) {
        console.log('Error from service retrieval:', err);
        return {};
    }
}

const addServices = async (body: ServiceData) => {
    try { 
        const response = await fetch('/api/service', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab!');
        }
        
        return data;
    } catch (err) {
        console.log('Error from service:', err);
        return Promise.reject('Could not add services');
    }
}

const updateService = async (id: string | undefined, body: ServiceUpdate) => {
    try {
        const response = await fetch(`/api/service/${id}`, { // Corrected the URL here
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab!');
        }

        return data;
    } catch (err) {
        console.log('Error from service updating:', err);
        return Promise.reject('Could not update service');
    }
}

// Create an object for serviceAPI
const serviceAPI = {
    retrieveServices,
    retrieveService,
    addServices,
    updateService,
};

export default serviceAPI;