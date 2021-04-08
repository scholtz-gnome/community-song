interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: null;
  role: string;
  verified: boolean;
  profile_pic: string;
  identity_provider: string;
  idp_id: string;
  created_at: string;
  updated_at: string;
}

export default User;
