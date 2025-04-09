import Auth from '../utils/auth';
import { ClientData } from "../interfaces/ClientData";

/**
 * Retrieves all clients from the API
 * @returns Promise with array of client data
 */
export const retrieveClients = async (): Promise<ClientData[]> => {
  try {
    const response = await fetch('/api/clients', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid client API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error retrieving clients:', err);
    return [];
  }
};

/**
 * Retrieves a specific client by ID
 * @param id Client ID to retrieve
 * @returns Promise with client data
 */
export const retrieveClient = async (id: number): Promise<ClientData | null> => {
  try {
    const response = await fetch(`/api/clients/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid client API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error retrieving client:', err);
    return null;
  }
};

/**
 * Creates a new client
 * @param client Client data to add
 * @returns Promise with the created client data
 */
export const addClient = async (client: Omit<ClientData, 'id'>): Promise<ClientData> => {
  try {
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(client)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid client API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error adding client:', err);
    return Promise.reject('Could not add client');
  }
};

/**
 * Updates an existing client
 * @param id Client ID to update
 * @param client Updated client data
 * @returns Promise with the updated client data
 */
export const updateClient = async (id: number, client: Partial<ClientData>): Promise<ClientData> => {
  try {
    const response = await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(client)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid client API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error updating client:', err);
    return Promise.reject('Could not update client');
  }
};

/**
 * Deletes a client
 * @param id Client ID to delete
 * @returns Promise confirming deletion
 */
export const deleteClient = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid client API response, check network tab!');
    }

    return true;
  } catch (err) {
    console.log('Error deleting client:', err);
    return Promise.reject('Could not delete client');
  }
};