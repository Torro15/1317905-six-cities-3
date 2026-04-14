import { createSlice } from '@reduxjs/toolkit';
import { Offer, OfferCard } from '../../types/offer';
import { Review } from '../../types/review';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchReviewsAction,
  postCommentAction,
} from '../api-actions';

interface OfferDetailsState {
  singleOffer: Offer | null;
  nearbyOffers: OfferCard[];
  reviews: Review[];
  isOfferLoading: boolean;
  isReviewsLoading: boolean;
  error: string | null;
}

const initialState: OfferDetailsState = {
  singleOffer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferLoading: false,
  isReviewsLoading: false,
  error: null,
};

const offerDetailsSlice = createSlice({
  name: 'offerDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.error = null;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.singleOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.isOfferLoading = false;
        state.error = action.error.message || 'Failed to load offer';
        state.singleOffer = null;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
        state.isReviewsLoading = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.error = 'Failed to post comment';
      });
  },
});

export default offerDetailsSlice.reducer;
