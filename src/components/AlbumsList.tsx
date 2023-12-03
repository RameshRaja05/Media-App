import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";
import { user } from "../types";

type albumsListProps = {
  user: user
};

function AlbumsList({ user }: albumsListProps) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  //display a content based on api response
  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="w-full h-10"/>;
  } else if (error) {
    content = <div className="text-red-500">error in loading albums</div>;
  } else if (!(data?.length === 0)) {
    content = data?.map((album) => {
     return <AlbumsListItem key={album.id} album={album}/>
    });
  }

  return (
    <div>
      <div className="m-3 flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button success outline onClick={handleAddAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>{content ? content : "No albums found in this user profile"}</div>
    </div>
  );
}

export default AlbumsList;
