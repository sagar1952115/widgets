// import { createSlice } from '@reduxjs/toolkit';
// import { categories } from '../../data';

// const initialState = {
//   categories: categories,
// };

// const widgetSlice = createSlice({
//   name: 'widgets',
//   initialState,
//   reducers: {
//     addWidget: (state, action) => {
//       const { categoryIndex, widget } = action.payload;
//       state.categories[categoryIndex].widgets.push(widget);
//     },
//     removeWidget: (state, action) => {
//       const { categoryIndex, widgetId } = action.payload;
//       state.categories[categoryIndex].widgets = state.categories[categoryIndex].widgets.filter(
//         (widget) => widget.id !== widgetId
//       );
//     },
//   },
// });

// export const { addWidget, removeWidget } = widgetSlice.actions;

// export default widgetSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../../data';

const initialState = {
  categories: categories,
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId, visible } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find(wid => wid.id === widgetId);
        if (widget) {
          widget.visible = visible;
        }
      }
    },
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      
      const category = state.categories.find(cat => cat.id === categoryId);
      console.log(category)
      if (category) {
        widget.visible=true;
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      }
    },
    addCategory: (state, action) => {
      const { id, name } = action.payload;
      state.categories.push({
        id: id,
        name: name,
        widgets: [],
      });
    },
    deleteCategory: (state, action) => {
      const { categoryId } = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== categoryId
      );
    },
  },
});

export const { addWidget, removeWidget, addCategory, deleteCategory,toggleWidgetVisibility } = widgetSlice.actions;

export default widgetSlice.reducer;
