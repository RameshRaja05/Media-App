import { album } from "../types";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import PhotosListItem from "./PhotosListItem";

type photolistProps = {
  album: album;
};

function PhotosList({ album }: photolistProps) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  //display a content based on api response
  let content;
  if (isFetching) {
    content =<Skeleton times={3} className=" w-10 h-10" isHorizontal />;
  } else if (error) {
    content = <div className="text-red-500">error in loading photos</div>;
  } else if (!(data?.length === 0)) {
    content = data?.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo}/>
    });
  }

  return (
    <div>
      <div className="m-3 flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">photos in {album.title}</h3>
        <Button
          success
          outline
          onClick={handleAddPhoto}
          loading={results.isLoading}
        >
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content ? content : "No photos found in this user profile"}
        </div>
    </div>
  );
}

export default PhotosList;
