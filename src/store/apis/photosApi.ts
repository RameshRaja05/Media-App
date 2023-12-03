import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { album, photo } from "../../types";

//Dev only
const pause = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes:['Photo','AlbumPhotos'],
  endpoints: (builder) => {
    return {
      fetchPhotos: builder.query<photo[], album>({
        //it provides two types of tags one for creating and another one for removing mutations
        //tag albumPhotos used for add mutation photos:remove mutation 
        providesTags:(result,_err,album)=>{
          const tags=result?.map((photo)=>{
            return {type:'Photo',id:photo.id}
          });
          return [...<[]>tags,{type:'AlbumPhotos',id:album.id}]
        },
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation<photo, album>({
        invalidatesTags:(_result,_err,album)=>{
           return [{type:'AlbumPhotos',id:album.id}]
        },
        query: (album) => {
          return {
            url: "/photos",
            method: "POST",
            body: {
              url: faker.image.url({ width: 100, height: 100 }),
              albumId: album.id,
            },
          };
        },
      }),
      removePhoto: builder.mutation<object, photo>({
        invalidatesTags:(_result,_err,photo)=>{
          return [{type:'Photo',id:photo.id}]
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
