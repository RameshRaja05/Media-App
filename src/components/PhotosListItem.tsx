import { GoTrashcan, GoSync } from "react-icons/go";
import { photo } from "../types";
import { useRemovePhotoMutation } from "../store";

type PhotosListItemProps = {
  photo: photo;
};

function PhotosListItem({ photo }: PhotosListItemProps) {
  const [doRemovePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    doRemovePhoto(photo);
  };
  return (
    <div className="relative m-2" onClick={handleRemovePhoto}>
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        {results.isLoading ? (
          <GoSync className="animate-spin" />
        ) : (
          <GoTrashcan className="text-3xl" />
        )}
      </div>
    </div>
  );
}

export default PhotosListItem;
