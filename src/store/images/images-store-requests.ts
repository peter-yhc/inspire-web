/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteImages, favouriteImage, getImages, ImageInfo,
} from 'api/firebase-stub.api';
import { RootState } from '../index';

const fetchImages = createAsyncThunk(
  'images/fetch',
  async (path: string) => await getImages(path) as ImageInfo[],
);

const removeSelectedImages = createAsyncThunk(
  'images/delete',
  async (_, { getState }): Promise<void> => deleteImages((getState() as RootState).images.selectedImages),
);

export interface FavouriteStatus {
  hash: string;
  favourite: boolean;
}

const toggleImageFavourite = createAsyncThunk(
  'images/favourite',
  async (hash: string, thunkAPI): Promise<FavouriteStatus> => {
    const favourite: boolean = !(thunkAPI.getState() as RootState).images.currentImages[hash].metadata?.favourite || true;
    await favouriteImage({ hash, isFavourite: favourite });
    return { hash, favourite };
  },
);

export {
  fetchImages,
  removeSelectedImages,
  toggleImageFavourite,
};
