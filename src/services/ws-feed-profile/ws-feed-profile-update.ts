import {
    IResponseWSS,
    TWSResponseActionTypes,
    WSResponseAction,
  } from "../../utils/types";
  
  export const WSFeedUpdateProfile = (
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
  