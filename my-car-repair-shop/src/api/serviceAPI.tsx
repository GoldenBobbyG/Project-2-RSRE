import Auth from '../utils/auth';
import { ServiceData } from "../interfaces/ServiceData";
import { ServiceUpdate } from "../interfaces/ServiceUpdate";

// Define interfaces for the service request data
export interface ServiceRequestData {
  make: string;
  model: string;
  year: string;
  name: string;
  date: string;
  comments: string;
  services: number[];
}

// Define interface for scheduled maintenance service
export interface ScheduledService {
  id: number;
  name: string;
  notes: string;
}

// Define interface for service order
export interface ServiceOrder {
  id: number;
  make: string;
  model: string;
  year: number;
  customer: string;
  requestDate: string;
  estimatedCost: number;
  services: ScheduledService[];
}

/**
 * Retrieves all available services for selection
 * @returns Promise with array of available services
 */
export const retrieveAvailableServices = async (): Promise<ServiceData[]> => {
  try {
    const response = await fetch('/api/services/available', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error retrieving available services:', err);
    return [];
  }
};

/**
 * Submits selected services
 * @param selectedServices Array of service IDs
 * @returns Promise with result of submission
 */
export const submitSelectedServices = async (selectedServices: number[]): Promise<any> => {
  try {
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({ selectedServices })
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error submitting selected services:', err);
    return Promise.reject('Could not submit selected services');
  }
};

/**
 * Submits a service request with vehicle and contact info
 * @param requestData Service request data
 * @returns Promise with result of submission
 */
export const submitServiceRequest = async (requestData: ServiceRequestData): Promise<any> => {
  try {
    const response = await fetch('/api/addService', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(requestData)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error submitting service request:', err);
    return Promise.reject('Could not submit service request');
  }
};

/**
 * Retrieves all scheduled maintenance orders
 * @returns Promise with array of service orders
 */
export const retrieveScheduledMaintenance = async (): Promise<ServiceOrder[]> => {
  try {
    const response = await fetch('/api/maintenance/scheduled', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error retrieving scheduled maintenance:', err);
    return [];
  }
};

/**
 * Assigns a technician to a service order
 * @param orderId Service order ID
 * @param technicianId Technician ID
 * @returns Promise with updated service order
 */
export const assignTechnician = async (orderId: number, technicianId: number): Promise<ServiceOrder> => {
  try {
    const response = await fetch(`/api/maintenance/${orderId}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({ technicianId })
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error assigning technician:', err);
    return Promise.reject('Could not assign technician');
  }
};

/**
 * Cancels a service order
 * @param orderId Service order ID
 * @returns Promise with result of cancellation
 */
export const cancelServiceOrder = async (orderId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/maintenance/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return true;
  } catch (err) {
    console.log('Error canceling service order:', err);
    return Promise.reject('Could not cancel service order');
  }
};

/**
 * Retrieves all services
 * @returns Promise with array of service data
 */
export const retrieveServices = async (): Promise<ServiceData[]> => {
  try {
    const response = await fetch('/api/service', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

/**
 * Retrieves a specific service by ID
 * @param id Service ID to retrieve
 * @returns Promise with service data
 */
export const retrieveService = async (id: number | undefined): Promise<ServiceData> => {
  try {
    const response = await fetch(`/api/service/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }
    
    return data;
  } catch (err) {
    console.log('Error from service retrieval:', err);
    return {
      id: null,
      name: null,
      description: null,
      cost: null
    };
  }
};

/**
 * Adds a new service
 * @param service Service data to add
 * @returns Promise with created service data
 */
export const addServices = async (service: Omit<ServiceData, 'id'>): Promise<ServiceData> => {
  try {
    const response = await fetch('/api/service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(service)
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
};

/**
 * Updates an existing service
 * @param id Service ID to update
 * @param service Updated service data
 * @returns Promise with updated service data
 */
export const updateService = async (id: string | undefined, service: ServiceUpdate): Promise<ServiceData> => {
  try {
    const response = await fetch(`/api/service/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(service)
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
};

/**
 * Deletes a service
 * @param id Service ID to delete
 * @returns Promise confirming deletion
 */
export const deleteService = async (id: string | number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/service/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    return true;
  } catch (err) {
    console.log('Error deleting service:', err);
    return Promise.reject('Could not delete service');
  }
};