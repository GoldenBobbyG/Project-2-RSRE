
import { EmployeeData} from '../interfaces/EmployeeData';


const retrieveEmployees = async () => {
    try {
      const response = await fetch('/api/employee', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('invalid user API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval:', err);
      return [];
    }
  };

  const retrieveEmployee = async (id: string | undefined) => {
    try {
      const response = await fetch(`/api/employee/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('invalid user API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval:', err);
      return {};
    }
  };
  
  const addEmployee = async (body: EmployeeData) => {
    try {
      const response = await fetch('/api/employee/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from Employee Creation: ', err);
      return Promise.reject('Could not create employee');
    }
  };

  export {
    retrieveEmployees,
    retrieveEmployee,
    addEmployee,
  };
