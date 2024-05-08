import { ctpClient } from './build-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

// TODO: Consider if it's necessary to delete the code below.
// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = () => {
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);
