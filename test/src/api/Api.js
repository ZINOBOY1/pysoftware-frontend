//fetchMenuItems: Fetches the list of available menu items for the UI.
// fetchCustomerAddresses: Retrieves paginated customer address data.
// deleteAddress: Deletes a specific address by its ID.
// editAddress: Edits an existing address based on the provided addressId and updated data.
// And it consist of the api key passed as a header in the requests to authenticate the user or application to the server.

const API_URL = 'https://pysoftware.com/v1';

export const fetchMenuItems = async () => {
  const response = await fetch(`${API_URL}/menu_items`, {
    headers: {
      'X-API-KEY': 'ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl',
    },
  });
  return response.json();
};

export const fetchCustomerAddresses = async (page) => {
  const response = await fetch(`${API_URL}/address_inventory/${page}`, {
    headers: {
      'X-API-KEY': 'ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl',
    },
  });
  return response.json();
};

export const deleteAddress = async (addressId) => {
  const response = await fetch(`${API_URL}/edit_address/delete/${addressId}`, {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl',
    },
  });
  return response.json();
};

export const editAddress = async (addressId, updatedData) => {
  const response = await fetch(`${API_URL}/edit_address/edit/${addressId}`, {
    method: 'PATCH',
    headers: {
      'X-API-KEY': 'ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};
