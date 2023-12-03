import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersReducer } from "./slices/usersSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { albumsApi} from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


export const store=configureStore({
    reducer:{
        users:usersReducer,
        [albumsApi.reducerPath]:albumsApi.reducer,
        [photosApi.reducerPath]:photosApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
      return getDefaultMiddleware().concat(albumsApi.middleware).concat(photosApi.middleware)
    }
})

setupListeners(store.dispatch)


//add types to  react redux hooks
export type RootState=ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export {useFetchAlbumsQuery,useAddAlbumMutation,useRemoveAlbumMutation} from "./apis/albumsApi";
export {useAddPhotoMutation,useRemovePhotoMutation,useFetchPhotosQuery} from "./apis/photosApi";