import { Controller,Get, Param,ParseIntPipe,Body,Post, Query,DefaultValuePipe , UseGuards, Delete,} from '@nestjs/common';
import {UsersService} from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { RoleValidationPipe } from './pipes/role-validation/role-validation.pipe.js';
import { RoleGuard } from './guards/role/role.guard.js';
import {Roles} from './decorators/roles.decorator.js'


@Controller('users')
export class UsersController {
    constructor( private readonly usersService : UsersService){}

// get users 
    @Get()
    // @Roles('admin','developer')
    getUsers(){
        return this.usersService.getUsers();
    }

// route for pagination with out DTOs
//     @Get('page')
//     getPaginatedUsers(
//     @Query('limit',new DefaultValuePipe(2), ParseIntPipe) limit : number,
//     @Query('offset',new DefaultValuePipe(0),ParseIntPipe) offset : number,
// ) {
//   return this.usersService.getPaginatedUsers(
//     limit,offset
//   );
// }

// route for pagination with DTOs

@Get('page')
getPaginatedUsers(@Query() query: PaginationQueryDto) {
  return this.usersService.getPaginatedUsers(
    query.limit,
    query.offset,
  );
}

// custom pipe used route
@Get('by-role')
getUsersByRole(
  @Query('role', RoleValidationPipe) role: string,
) {

    const users =  this.usersService.getUsersByRole(role)

    return {
        message : "users fetch sussesfully",
        role : role,
        users 
    }
   
}
// get user by id
    @Get(':id')
    getUserById(@Param('id' , ParseIntPipe) id : number) {
    return this.usersService.getUserById(id);
}
    @Post()
    createUser(@Body() body : CreateUserDto){
        return this.usersService.createUser(body.name, body.role);
    }

// delete route with guard 
    @Delete(':id')
    // @Roles('admin')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.deleteUser(id);
}
}