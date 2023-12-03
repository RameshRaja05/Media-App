import { useEffect } from "react";
import { fetchUsers, useAppSelector, addUser} from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useAppSelector((state) => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doAddUser();
  };
  

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={20} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data ...</div>;
  } else {
    content = data.map((user) => {
      return (
         <UsersListItem user={user} key={user.id}/>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="text-xl m-2">Users</h1>
        <Button primary outline onClick={handleUserAdd} loading={isCreatingUser}>
          + add user
        </Button>
        {creatingUserError && "error creating user"}
      </div>
      {content}
    </div>
  );
}
export type thunkActionType = typeof fetchUsers;
export default UsersList;
