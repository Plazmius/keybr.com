import { PLAYER_KICKED } from "@keybr/multiplayer-shared";
import { type AnyUser } from "@keybr/pages-shared";
import { setTimeout, type Timeout } from "@keybr/timer";
import { useEffect, useState } from "react";

export function useWebSocket(user: AnyUser) {
  const [state, setState] = useState({
    webSocket: null,
    readyState: WebSocket.CONNECTING,
    kicked: false,
  } as {
    readonly webSocket: WebSocket | null;
    readonly readyState: number;
    readonly kicked: boolean;
  });

  useEffect(() => {
    let webSocket: WebSocket | null = null;
    let timeout: Timeout | null = null;

    const connect = () => {
      const newWebSocket = (webSocket = useWebSocket.newWebSocket(user));

      newWebSocket.addEventListener("open", () => {
        console.log("WebSocket connected");
        setState({
          webSocket: (webSocket = newWebSocket),
          readyState: WebSocket.OPEN,
          kicked: false,
        });
      });

      newWebSocket.addEventListener("close", (ev) => {
        console.log(`WebSocket closed; code=${ev.code}, reason='${ev.reason}'`);
        setState({
          webSocket: (webSocket = null),
          readyState: WebSocket.CLOSED,
          kicked: ev.code === PLAYER_KICKED,
        });
        switch (ev.code) {
          case 1006: // CLOSE_ABNORMAL
          case 1012: // Service Restart
          case 1013: // Try Again Later
            timeout = setTimeout(() => {
              timeout = null;
              connect();
            }, 3000);
            break;
        }
      });

      newWebSocket.addEventListener("error", () => {
        console.error("WebSocket error");
        newWebSocket.close();
      });
    };

    connect();

    return () => {
      if (webSocket != null) {
        webSocket.close();
        webSocket = null;
      }
      if (timeout != null) {
        timeout.cancel();
        timeout = null;
      }
    };
  }, [user]);

  return state;
}

useWebSocket.newWebSocket = (user: AnyUser): WebSocket => {
  return new WebSocket(webSocketUrl());
};

function webSocketUrl(): string {
  const { protocol, host } = window.location;
  let scheme = "";
  switch (protocol) {
    case "https:":
      scheme = "wss:";
      break;
    case "http:":
      scheme = "ws:";
      break;
    default:
      throw new Error();
  }
  return `${scheme}//${host}/_/game/server`;
}
