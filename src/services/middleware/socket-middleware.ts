import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "..";
import { refreshToken } from "../../utils/api";

export type WSActions<R, S> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
  wsActionsMap: Record<string, WSActions<R, S>>,
  withTokenRefresh: boolean = false
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    const sockets: Record<string, WebSocket | null> = {}; 
    const urls: Record<string, string> = {}; 
    const isConnected: Record<string, boolean> = {}; 
    const reconnectTimers: Record<string, number> = {};

    return (next) => (action) => {
      const { dispatch } = store;

      const wsActionsEntry = Object.entries(wsActionsMap).find(([_, actions]) =>
        [actions.connect, actions.disconnect].some((ac) => ac.match(action))
      );

      if (!wsActionsEntry) {
        return next(action);
      }

      const [connectionId, wsActions] = wsActionsEntry;
      const {
        connect,
        disconnect,
        onConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (connect.match(action)) {
        const url = action.payload;

        if (!sockets[connectionId]) {
          sockets[connectionId] = new WebSocket(url);
          urls[connectionId] = url;
          isConnected[connectionId] = true;

          onConnecting && dispatch(onConnecting());

          const socket = sockets[connectionId]!;

          socket.onopen = () => {
            onOpen && dispatch(onOpen());
          };

          socket.onerror = () => {
            dispatch(onError("Error"));
          };

          socket.onmessage = (event) => {
            const { data } = event;
            try {
              const parsedData = JSON.parse(data);

              if (
                withTokenRefresh &&
                parsedData.message === "Invalid or missing token"
              ) {
                refreshToken()
                  .then((refreshData) => {
                    const wssUrl = new URL(urls[connectionId]);
                    wssUrl.searchParams.set(
                      "token",
                      refreshData.accessToken.replace("Bearer ", "")
                    );
                    dispatch(connect(wssUrl.toString()));
                  })
                  .catch((err) => {
                    dispatch(onError((err as Error).message));
                  });
                dispatch(disconnect());
                return;
              }

              dispatch(onMessage(parsedData));
            } catch (err) {
              dispatch(onError((err as Error).message));
            }
          };

          socket.onclose = () => {
            onClose && dispatch(onClose());
            if (isConnected[connectionId]) {
              reconnectTimers[connectionId] = window.setTimeout(() => {
                dispatch(connect(urls[connectionId]));
              }, RECONNECT_PERIOD);
            }
          };
        }
      }

      if (disconnect.match(action)) {
        clearTimeout(reconnectTimers[connectionId]);
        isConnected[connectionId] = false;

        if (sockets[connectionId]) {
          sockets[connectionId]!.close();
          sockets[connectionId] = null;
        }
      }

      return next(action);
    };
  };
};