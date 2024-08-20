import { configureStore } from '@reduxjs/toolkit';
import widgetSlice from './widgets/widgetSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetSlice,
  },
});
