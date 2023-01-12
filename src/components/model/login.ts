export interface LoginForm {
    email: string,
    password: string
}


  export interface Login {
    data: Data
  }
  
  export interface Data {
   
      "message": string,
      "email": string,
      "status":string,
      "valid":boolean
  
  }