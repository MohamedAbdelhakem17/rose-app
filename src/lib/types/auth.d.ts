export interface LoginResponse {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string;
    role: string;
    wishlist: [];
    addresses: [];
  };
  token: string;
}
