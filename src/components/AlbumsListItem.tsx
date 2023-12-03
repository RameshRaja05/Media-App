import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandedPanel from "./ExpandedPanel";
import { useRemoveAlbumMutation } from "../store";
import { album } from "../types";
import PhotosList from "./PhotosList";

type albumsListItemProps = {
  album:album;
};

function AlbumsListItem({ album }: albumsListItemProps) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button className="mr-3" danger outline onClick={handleRemoveAlbum} loading={results.isLoading}>
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );

  return (
    <ExpandedPanel key={album.id} header={header} className="bg-gray-300">
      <PhotosList album={album}></PhotosList>
    </ExpandedPanel>
  );
}

export default AlbumsListItem;
