import { createAsyncThunk } from '@reduxjs/toolkit';
import { Collection, createCollection } from '../../api/firebase-stub.api';

const createNewCollection = createAsyncThunk(
  'profile/collection-create',
  async ({ name, projectId }: {name:string, projectId: string}): Promise<Collection> => createCollection(projectId, name),
);

export {
  createNewCollection,
};
