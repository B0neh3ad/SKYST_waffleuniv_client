import { useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface StompClientProps {
  url: string;
  token: string | null;
  roomId: string;
  onConnect?: () => void;
  onMessage?: (message: any) => void;
}

interface SongRequest {
  title: string;
  artist: string;
  sourceUrl: string;
  comment: string;
}

interface ReactionRequest {
  songId: number;
  emoji: string;
}

export const useStompClient = ({
  url,
  token,
  roomId,
  onConnect,
  onMessage,
}: StompClientProps) => {
  const clientRef = useRef<Client | null>(null);

  const sendSongRequest = useCallback(
    (song: SongRequest) => {
      if (!clientRef.current?.connected) {
        console.error("STOMP client is not connected");
        return;
      }

      clientRef.current.publish({
        destination: `/app/room/${roomId}/song`,
        body: JSON.stringify(song),
      });
    },
    [roomId]
  );

  const sendReaction = useCallback(
    (reaction: ReactionRequest) => {
      if (!clientRef.current?.connected) {
        console.error("STOMP client is not connected");
        return;
      }

      clientRef.current.publish({
        destination: `/app/room/${roomId}/reaction`,
        body: JSON.stringify(reaction),
      });
    },
    [roomId]
  );

  useEffect(() => {
    if (!token) return;

    const socket = new SockJS(url);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to STOMP");
      client.subscribe(`/topic/room/${roomId}`, (message) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          onMessage?.(parsedMessage);
        } catch (error) {
          console.error("Error parsing STOMP message:", error);
        }
      });
      onConnect?.();
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [url, token, roomId, onConnect, onMessage]);

  return { sendSongRequest, sendReaction };
};
