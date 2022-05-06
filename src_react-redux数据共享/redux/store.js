import { configureStore} from "@reduxjs/toolkit";
import countReducer from "./count_reducer";
import personReducer from './person'
export default configureStore({
  reducer: {
    countReducer,
    personReducer
  },
});
