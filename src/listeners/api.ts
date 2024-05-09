// api.ts

// Define a type for the response data
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Define a generic function for making API calls
export async function fetchData<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
      const response = await fetch(url, options);

      if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, status: response.status };
  } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
  }
}

export async function fetchVendorData() {
  try {
    const url = 'http://fms.opengov.devvm.cloudvm.com/oci/api/v2/import/validate';
    const headers = {
      'Content-Type': 'application/json',
      'Cookie' : 'FIN_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoib3BlbmdvdiIsInNzbyI6MCwiaWF0IjoxNzA5NzE0MTgzLCJleHAiOjE3MDk3NTAxODN9.7FtUk83SbCnoeysmLdR4ESc1Mp_p24H8VxNoxY1qNAE'
      // Add any additional headers here
    };
    const requestBody = { "data": [
      {
          "PAYMENT_DATE": "01/10/2024",
          "SERVICE_ACCOUNT_NUMBER": "",
          "TRANSACTION_AMOUNT": 11,
          "AR_INVOICE_REFERENCE_NO": "4444",
          "TIME_PAYMENT_ENTERED": "121241",
          "TENDER_TYPE": "C",
          "TENDER_REFERENCE_NUMBER": "",
          "ALLOW_OVER_PAYMENT": "Y",
          "OPERATION": "Add"
      }
      ],"interface": {
    "type": "ARBT",
    "subtype": "ARBTPYMT"
    },
    "calledby": "opengov" };
    
    const body = JSON.stringify(requestBody);
    alert('call api');
    const response = await fetch(url, {
      method: 'POST', // or 'GET', 'PUT', 'DELETE', etc.
      headers: headers,
      body: body,
    });
    alert('Failed to fetch data');
    // Check if the response is successful
    if (!response.ok) {
      alert('Failed to fetch data');
      throw new Error('Failed to fetch data');
     
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the data
    console.log(data);
  } catch (error) {
    alert(error);
    console.error('Error:', error);
  }
}