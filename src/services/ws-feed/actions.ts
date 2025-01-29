import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "ws-feed/connect">(
  "ws-feed/connect"
);
export const wsDisconnect = createAction("ws-feed/disconnect");
