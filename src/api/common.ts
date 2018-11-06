class ApiError extends Error {
    message: string;
    statusCode: number
  
    constructor(message:string, statusCode: number){
      super();
      this.message = message;
      this.stack = (new Error()).stack
      this.statusCode = statusCode
    }
  }
  
  export async function getApi(endpoint: string) {
    const response = await fetch(endpoint, 
      { headers:{
        'Client-Identifier' : 'fdb907ac23417d7bd4a4d918bb45e22a'
      }});
    return await parseJSON(response);
  }
  
//   export async function addApi<Entity>(endpoint:string, entity:Entity) {
//     const response = await fetch(endpoint, {
//       method: 'POST',
//       body: JSON.stringify(entity),
//       credentials: 'same-origin',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     });
//     return await parseJSON(response);
//   }
  
//   export async function updateApi<Entity>(endpoint:string, entity:Entity) {
//     const response = await fetch(endpoint, {
//       method: 'PUT',
//       body: JSON.stringify(entity),
//       credentials: 'same-origin',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     });
//     return await parseJSON(response);
//   }
  
//   export async function deleteApi(endpoint: string) {
//     return await fetch(endpoint, { method: 'DELETE', credentials: 'same-origin'});
//   }
  
  async function parseJSON(response:Response) {
    if (response.status === 500) {
      const errorMsg = 'Uventet feil, vennligst prøv igjen senere.'
      throw new ApiError(errorMsg, response.status)
    }
  
    if (!response.ok) {
      return response.json().then(data => {
        if (data.error) {
          throw new ApiError(data.error, response.status)
        } else if (data.message) {
          throw new ApiError(data.message, response.status)
        } else if (data.validationErrorMessages) {
          throw new ApiError(data.validationErrorMessages[0].message, response.status)
        }
        else 
          throw new ApiError(response.url, response.status)
      })
    }
  
    return await response.json().catch(() => ({})) // Håndterer tom respons
  }