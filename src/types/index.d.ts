import mongoose from 'mongoose';


declare type HttpStatusCode =
  | 400 // Bad Request
  | 401 // Unauthorized
  | 402 // Payment Required
  | 403 // Forbidden
  | 404 // Not Found
  | 405 // Method Not Allowed
  | 406 // Not Acceptable
  | 407 // Proxy Authentication Required
  | 408 // Request Timeout
  | 409 // Conflict
  | 410 // Gone
  | 411 // Length Required
  | 412 // Precondition Failed
  | 413 // Payload Too Large
  | 414 // URI Too Long
  | 415 // Unsupported Media Type
  | 416 // Range Not Satisfiable
  | 417 // Expectation Failed
  | 418 // I'm a teapot
  | 421 // Misdirected Request
  | 422 // Unprocessable Entity
  | 423 // Locked
  | 424 // Failed Dependency
  | 425 // Too Early
  | 426 // Upgrade Required
  | 428 // Precondition Required
  | 429 // Too Many Requests
  | 431 // Request Header Fields Too Large
  | 451 // Unavailable For Legal Reasons
  | 500 // Internal Server Error
  | 501 // Not Implemented
  | 502 // Bad Gateway
  | 503 // Service Unavailable
  | 504 // Gateway Timeout
  | 505 // HTTP Version Not Supported
  | 506 // Variant Also Negotiates
  | 507 // Insufficient Storage
  | 508 // Loop Detected
  | 510 // Not Extended
  | 511; // Network Authentication Required

declare interface ProductData extends mongoose.Document {
  name: string,
  price: string,
}

interface UserProductDataWithId extends ProductData {
  date_purchased: Date;
}

declare type UserProductData = Omit<UserProductDataWithId, 'price'>

declare interface UserData extends mongoose.Document {
  name?: string
  email?: string;
  email_verified?: Date;
  password: string;
  products: UserProductData[];
  createdAt: Date;
  updatedAt: Date;
  image?: string
  accounts: Account[]
}

declare interface Account extends mongoose.Document {
  userId: mongoose.ObjectId;
  type: string;
  provider: string;
  provider_account_id: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

declare interface Session extends mongoose.Document {
  sessionToken: string;
  userId: string;
  expires: Date;
  user: UserData
}

declare interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date
}

declare type UserDataNoPassword = Omit<UserData, 'password'>

