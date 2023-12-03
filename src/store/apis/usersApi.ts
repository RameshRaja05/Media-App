import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { user } from "../../types";


const usersApi=createApi({
    reducerPath:'users',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000'
    }),
    tagTypes:['User'],
    endpoints:(builder)=>{
        return{
            fetchUsers:builder.query<user[],void>({
                providesTags:['User'],
                query:()=>{
                    return{
                        url:'/users',
                        method:'GET'
                    }
                }
            }),
            addUser:builder.mutation<user,void>({
                invalidatesTags:['User'],
                query:()=>{
                     return{
                        url:'/users',
                        method:'POST',
                        body:{
                            name:faker.person.fullName()
                        }
                     }
                }
            }),
            removeUser:builder.mutation<object,user>({
                invalidatesTags:['User'],
                query:(user)=>{
                    return{
                        url:`/users/${user.id}`,
                        method:'DELETE'
                    }
                }
            })
        }
    }
})

export const{useFetchUsersQuery,useAddUserMutation,useRemoveUserMutation}=usersApi;
export {usersApi};