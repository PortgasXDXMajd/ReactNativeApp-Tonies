import { ActionTypes } from "../action_types";

export interface IUIActionModel {
  type: string;
  payload: boolean;
}

export interface IUIIntitalState {
  outerScrollViewScrollEnabled: boolean;
}

const initialState: IUIIntitalState = {
  outerScrollViewScrollEnabled: true,
};

const UIReducer = (
  state: IUIIntitalState = initialState,
  action: IUIActionModel,
): IUIIntitalState => {
  switch (action.type) {
    case ActionTypes.SET_OUTTER_SCROLL_VIEW:
      return {
        ...state,
        outerScrollViewScrollEnabled: action.payload,
      };
    default:
      return state;
  }
};

export { UIReducer };
