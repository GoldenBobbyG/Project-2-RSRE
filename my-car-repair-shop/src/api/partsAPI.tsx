import { PartData } from "../interfaces/PartData"


const retrieveParts = async () => {
    try {
        const response = await fetch('/api/part', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        if (!response.ok){
            throw new Error('Invalid user API response, check network tab!');
        }
        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
}

const addParts = async (body: PartData) => {
    try {
      const response = await fetch(
        '/api/part/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      )
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from Part Selection: ', err);
      return Promise.reject('Could not add parts');
    }
  }
  
  export { retrieveParts, addParts };
  