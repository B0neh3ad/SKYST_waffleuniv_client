// hooks/useStompClient.ts
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";

interface UseStompProps {
  url: string; // ex) http://your-server/ws
  token: string;
  roomId: string;
  onMessage: (data: any) => void;
}

export const useStompClient = ({
  url,
  token,
  roomId,
  onMessage,
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

  const sendSongRequest = (data: {
    title: string;
    artist: string;
    sourceUrl: string;
    comment: string;
  }) => {
    clientRef.current?.publish({
      destination: `/app/room/${roomId}/songrequest`,
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const sendReaction = (name: string) => {
    clientRef.current?.publish({
      destination: `/app/room/${roomId}/reaction`,
      body: JSON.stringify({ name }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { sendSongRequest, sendReaction };
};
