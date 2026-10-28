import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {


  constructor(private readonly prisma: PrismaService) {}
    // to get all the users 

  //    private users = [
  //   { id: 101, name: 'mike', role: 'developer' },
  //   { id: 102, name: 'will', role: 'admin' },
  //   { id: 103, name: 'ele', role: 'user' },
  // ];

   async getUsers(){
        return this.prisma.user.findMany({
          select: {
            id: true,
            name: true,
            role:true,
            createdAt: true,
          
          },
        })
    }

    // to get a single user from the ID
    async getUserById(id : number){

     const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          role:true,
          createdAt: true,  
        },
     });

     if(!user){
        throw new NotFoundException(`User with ID ${id} not found`);
     }
     return user;
    }

    // to create a new user 


    async createUser(name: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        username: name,
        role: role,
        password: hashedPassword,
      },
      select:{
        id: true,
        username: true,
        role: true,
        createdAt: true,          
      }
    } );

    return newUser;
  }

//   query param logic

   async getPaginatedUsers(limit: number, offset: number) {
   return this.prisma.user.findMany({
     take: limit,
     skip: offset,
     select:{
        id: true,
        username: true,
        role: true,
        createdAt: true,          
      },
   });
  }

//   role based users to test the custom pipe

async getUsersByRole(role: string) {
  return this.prisma.user.findMany({
    where: {
      role: role,
    },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,          
    },
  }); 
}

// delete logic 

async deleteUser(id : number){

 try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
        select: {
          id: true,
          username: true,
          role: true,
        },
      });

       return {
        message: 'User deleted successfully',
        user: deletedUser,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      throw error;
    }
}

}


export default UsersService;