interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  role: string;
  verified: boolean;
  profilePic: string | null;
  identityProvider: string;
  idpId: string;
  createdAt: string;
  updatedAt: string;
}

export default User;
