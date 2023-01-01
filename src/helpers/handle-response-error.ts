import { tokenErrorMessage } from '../messages/errors';

function handleResponseError(error: string) {
  let errorMessage = error;

  if (error.includes('token')) errorMessage = tokenErrorMessage;

  alert(errorMessage);
  console.error(error);
}

export { handleResponseError };
