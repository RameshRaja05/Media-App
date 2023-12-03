import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers=createAsyncThunk('users/fetch',async()=>{
 const response=await axios.get('http://localhost:3000/users')
 await pause(1000)
 return response.data
})

//Dev only testing purpose

const pause=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

export {fetchUsers};