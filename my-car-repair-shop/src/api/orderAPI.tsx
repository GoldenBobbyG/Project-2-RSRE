import Auth from '../utils/auth';
import { OrderData } from '../interfaces/OrderData';
import { OrderUpdateData } from '../interfaces/OrderUpdateData';

// interfaces to match backend Order model
// export interface OrderData {
//   id?: number;
//   service_name: string;
//   price: number;
//   service_date: number;
//   user_id: number;
//   employee_id: number;
// }

// // Interface for order updates
// export interface OrderUpdateData {
//   service_name?: string;
//   price?: number;
//   service_date?: number;
//   employee_id?: number;
// }


export const retrieveOrders = async () => {
  try {
    const response = await fetch('/api/order', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid order API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from orders retrieval:', err);
    return [];
  }
};


export const retrieveOrder = async (id: string | number) => {
  try {
    const response = await fetch(`/api/order/${id}`, {
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
    console.log('Error from order retrieval:', err);
    return null;
  }
};


export const createOrder = async (orderData: OrderData) => {
  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error creating order:', err);
    return Promise.reject('Could not create order');
  }
};

export const updateOrder = async (id: string | number, orderData: OrderUpdateData) => {
  try {
    const response = await fetch(`/api/order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error updating order:', err);
    return Promise.reject('Could not update order');
  }
};


export const deleteOrder = async (id: string | number) => {
  try {
    const response = await fetch(`/api/order/${id}`, {
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
    console.log('Error deleting order:', err);
    return Promise.reject('Could not delete order');
  }
};


export const retrieveService = async (id: number | undefined) => {
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


export const updateService = async (id: string | undefined, serviceData: any) => {
  try {
    const response = await fetch(`/api/service/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(serviceData)
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


export const retrieveUserOrders = async (userId: number) => {
  try {
    const response = await fetch(`/api/order/user/${userId}`, {
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
    console.log('Error retrieving user orders:', err);
    return [];
  }
};


export const assignEmployeeToOrder = async (orderId: number, employeeId: number) => {
  try {
    const response = await fetch(`/api/order/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({ employee_id: employeeId })
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error assigning employee to order:', err);
    return Promise.reject('Could not assign employee to order');
  }
};