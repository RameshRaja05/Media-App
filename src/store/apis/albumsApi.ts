import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { album,user } from "../../types";


//Dev only
const pause = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: ["UserAlbums", "Album"],
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<album[], user>({
        providesTags: (result, _err, user) => {
          const tags=result?.map((album)=>{
            return {type:'UserAlbums',id:album.id}
          })
          return [...<[]>tags,{type:'Album',id:user.id}]
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation<album, user>({
        invalidatesTags: (_result, _err, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
            method: "POST",
          };
        },
      }),
      removeAlbum: builder.mutation<object, album>({
        invalidatesTags: (_results, _err, album) => {
          return [{ type: "UserAlbums", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
