import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setSorting } from './action';
import { OfferCard } from '../types/offer';
import { CITIES } from '../const';


export type AppState = {
  city: string;
  offers: OfferCard[];
  sorting: string;
};

const initialState: AppState = {
  city: CITIES[0],
  offers: [],
  sorting: 'popular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSorting, (state, action) => {
      state.sorting = action.payload;
    });
});

export default reducer;
