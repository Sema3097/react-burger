import { createAction } from "@reduxjs/toolkit";

export const wsConnectProfile = createAction<string, "ws-feed-profile/connect">(
  "ws-feed-profile/connect"
);
export const wsDisconnectProfile = createAction("ws-feed-profile/disconnect");
