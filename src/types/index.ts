type album = { id: string | number; title: string; userId: string | number };
type user = { id: string | number; name: string };
type photo= { id: string | number; url: string; albumId: string | number };



export {type album,type user,type photo}