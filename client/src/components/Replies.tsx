import React from "react";
import { observer } from "mobx-react-lite";

import { Message } from "./Message";
import { Composer } from "./Composer";

import { useQuery } from "../models/reactUtils";
import { MessageModelType } from "../models";

export const Replies = observer(
  ({ message }: { message: MessageModelType }) => {
    const { data, error, loading } = useQuery(() => message.loadReplies());
    return (
      <div className="replies">
        {error ? (
          <div>{error}</div>
        ) : loading ? (
          <div>loading</div>
        ) : (
          <>
            <ul>
              {data.messages.map(message => (
                <Message key={message.id} message={message} asChild />
              ))}
            </ul>
            <Composer replyTo={message} />
          </>
        )}
      </div>
    );
  }
);
