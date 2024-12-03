import {
  IResponseWSS,
  TWSResponseActionTypes,
  WSResponseAction,
} from "../../utils/types";

export const WSFeedUpdate = (
  prevResp: IResponseWSS,
  actions: TWSResponseActionTypes
): IResponseWSS => {
  let resp = prevResp;
  actions.forEach((action) => {
    switch (action.type) {
      case WSResponseAction.DATA:
        resp = action.data;
        break;
    }
  });
  return resp;
};
