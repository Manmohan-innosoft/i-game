import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    // to get all the users 

     private users = [
    { id: 101, name: 'mike', role: 'developer' },
    { id: 102, name: 'will', role: 'admin' },
    { id: 103, name: 'ele', role: 'user' },
  ];

    getUsers(){
        return this.users;
    }

    // to get a single user from the ID
    getUserById(id : number){

     const user = this.users.find((user) => user.id === id);

     if(!user){
        throw new NotFoundException(`User with ID ${id} not found`);
     }
     return user;
    }

    // to create a new user 


    createUser(name: string, role: string) {
    const newUser = {
      id: Math.max(0, ...this.users.map((user) => user.id)) + 1,
      name,
      role,
    };

    this.users.push(newUser);

    return newUser;
  }

//   query param logic

   getPaginatedUsers(limit: number, offset: number) {
   return this.users.slice(offset, offset + limit);
  }

//   role based users to test the custom pipe

getUsersByRole(role: string) {
  return this.users.filter((user) => user.role === role);
}

// delete logic 

deleteUser(id : number){
     const index = this.users.findIndex((user) => user.id === id);

  if (index === -1) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  const deletedUser = this.users.splice(index, 1);

  return {
    message: 'User deleted successfully',
    user: deletedUser[0],
  };
}

}


export default UsersService;