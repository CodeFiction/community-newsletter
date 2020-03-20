import { h } from "preact";

interface MessageItemProps {
  communityScore: number;
  text: string;
  link: string;
  timestamp: number;
}

export function MessageItem({
  communityScore,
  text,
  link,
  timestamp
}: MessageItemProps) {
  const hasText = !!text;

  return (
    <div class="message">
      <div class="message--header">
        <div class="user-info">
          <h2 class="username">
            Codefiction
            <span>{new Date(timestamp).toLocaleString()}</span>
          </h2>
        </div>
        <div class="reaction-count">
          <img src="../../assets/img/thumb-up-line.svg" class="thumbs-icon" />
          {communityScore}
        </div>
      </div>
      <a
        href="https://codefiction.tech/episodes/mikroservis-donusum-macerasi"
        class="message--content"
      >
        {hasText ? text : link}

        {hasText && (
          <div class="message--link">
            <img src="../../assets/img/external-link.svg"/>
            {link}
          </div>
        )}
      </a>
    </div>
  );
}
