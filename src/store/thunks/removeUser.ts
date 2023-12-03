import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { user } from "../../types";

export const removeUser=createAsyncThunk('user/remove',async(user:user)=>{
  await axios.delete(`http://localhost:3000/users/${user.id}`);
  return user
})