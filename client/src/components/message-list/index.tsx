import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { RoutableProps } from "preact-router";

import { MessageItem } from "../message-item";

type MessageListProps = {
  channelId?: string;
} & RoutableProps;

export function MessageList({ channelId = "" }: MessageListProps) {
  const [messages, setMessages] = useState([] as Message[]);
  useEffect(() => {
    fetch(`https://cf-community-news.herokuapp.com/messages/${channelId}`)
      .then(response => response.json())
      .then((messages: Message[]) => setMessages(messages));
  }, [channelId]);

  return (
    <div class="content">
      {!messages.length ? (
        <p class="loading-spinner"> Yükleniyor...</p>
      ) : (
        <div class="data-list">
          {messages.map(message => (
            <MessageItem
              communityScore={message.rating}
              text={message.text.replace(message.links[0], "")}
              link={message.links[0]}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface Message {
  links: string[];
  reactionCount: number;
  channelId: string;
  replyUsersCount: number;
  messageId: string;
  timestamp: number;
  text: string;
  replyCount: number;
  rating: number;
}
