import { combineReducers } from "redux";
import { AppReducer } from "./app_reducer";
import { DataReducer } from "./data_reducer";
import { TrackingReducer } from "./tracking_reducer";
import { UIReducer } from "./ui_reducer";

const reducers = combineReducers({
  app: AppReducer,
  track: TrackingReducer,
  ui: UIReducer,
  data: DataReducer,
});

export type StateModel = ReturnType<typeof reducers>;
export { reducers };
