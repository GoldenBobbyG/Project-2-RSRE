import Auth from '../utils/auth';
import { PartData } from "../interfaces/PartData";

/**
 * Retrieves all parts from the API
 */
export const retrieveParts = async () => {
  try {
    const response = await fetch('/api/part', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid parts API response, check network tab!');
    }
    
    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

/**
 * Adds a new part to the inventory
 */
export const addParts = async (part: PartData) => {
  try {
    const response = await fetch('/api/part/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(part)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from Part Selection: ', err);
    return Promise.reject('Could not add parts');
  }
};

/**
 * Updates an existing part
 */
export const updatePart = async (id: number | string, part: Partial<PartData>) => {
  try {
    const response = await fetch(`/api/part/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(part)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error updating part:', err);
    return Promise.reject('Could not update part');
  }
};
