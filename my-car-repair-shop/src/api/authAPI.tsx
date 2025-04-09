import { UserLogin } from "../interfaces/UserLogin";

/**
 * Authenticates a user and returns login information
 * @param userInfo User credentials (username/email and password)
 */
export const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

// New logout function to complete the auth API functionality
export const logout = async () => {
  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    return true;
  } catch (err) {
    console.log('Error during logout: ', err);
    return Promise.reject('Could not complete logout');
  }
};