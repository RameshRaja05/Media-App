import { SerializedError, AsyncThunkAction } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../store';
 
type AsyncThunkActionCreator<R, T> = ((args: T) => AsyncThunkAction<R, T, object>)|(()=>AsyncThunkAction<R,T,object>);
 
function useThunk<R, T>(
  thunk: AsyncThunkActionCreator<R, T>,
  args?: T
): [() => Promise<unknown>, boolean, SerializedError | null] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SerializedError | null>(null);
  const dispatch = useAppDispatch();
 
  const runThunk = useCallback(() => {
    setIsLoading(true);
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return dispatch(thunk(args!))
      .unwrap()
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk, args]);
 
  return [runThunk, isLoading, error];
}
 
export { useThunk };