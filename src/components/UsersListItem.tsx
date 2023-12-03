import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/use-thunk";
import { removeUser } from "../store";
import Button from "./Button";
import ExpandedPanel from "./ExpandedPanel";
import AlbumsList from "./AlbumsList";
import { user } from "../types";

type userItemProps = {
  user: user;
};

function UsersListItem({ user }: userItemProps) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser, user);
  const handleRemoveUser = () => {
    doRemoveUser();
  };

  const header = (
    <>
      {error && <div>Error deleting user</div>}
      <Button
        className="mr-3"
        danger
        outline
        onClick={handleRemoveUser}
        loading={isLoading}
      >
        <GoTrashcan />
      </Button>
      {user.name}
    </>
  );
  return (
    <ExpandedPanel header={header} className="bg-gray-100">
      <AlbumsList user={user} />
    </ExpandedPanel>
  );
}

export default UsersListItem;
export type thunkActionWithArgs = typeof removeUser;
