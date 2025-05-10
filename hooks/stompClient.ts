// hooks/useStompClient.ts
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";

interface UseStompProps {
  url: string;
  token: string;
  roomId: string;
  onMessage: (data: any) => void;
  onConnect: () => void;
}

export const useStompClient = ({
  url,
  token,
  roomId,
  onMessage,
  onConnect,
}: UseStompProps) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ STOMP connected");
        client.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
          const payload = JSON.parse(message.body);
          onMessage(payload);
        });
        onConnect();
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [url, token, roomId, onMessage]);

  const isConnected = () => {
    return clientRef.current && clientRef.current.connected;
  };

  const sendSongRequest = (data: {
    title: string;
    artist: string;
    sourceUrl: string;
    comment: string;
  }) => {
    if (isConnected()) {
      clientRef.current!.publish({
        destination: `/app/room/${roomId}/songrequest`,
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.warn("🛑 STOMP client not connected yet. Song request not sent.");
    }
  };

  const sendReaction = (name: string) => {
    if (isConnected()) {
      clientRef.current!.publish({
        destination: `/app/room/${roomId}/reaction`,
        body: JSON.stringify({ name }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Reaction sent:", name);
    } else {
      console.warn("🛑 STOMP client not connected yet. Reaction not sent.");
    }
  };

  return { sendSongRequest, sendReaction };
};
