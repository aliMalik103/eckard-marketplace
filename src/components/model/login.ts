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

export interface User {
  data: UserDetails
}

export interface UserDetails {
  message: string
  email: string
  status: string
  valid: boolean,
  id: number
}
