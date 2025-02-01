/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Auth {
  export interface User {
    id?: string;
    name?: string | null;
    username?: string;
    email?: string | null;
    password?: string;
    image?: string | null;
    role?:"member" | "admin"
  }
}
