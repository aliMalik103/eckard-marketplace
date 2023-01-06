export interface LoginForm {
    email: string,
    password: string
}


  export interface Login {
    data: Data
  }
  
  export interface Data {
    message: string
    email_address: string
  }