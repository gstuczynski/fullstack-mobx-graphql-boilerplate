import React from "react";
import { observer } from "mobx-react-lite";

import { useQuery } from "../models/reactUtils";
import { Message } from "./Message";

export const MessageWall = observer(() => {
  const { store, error, loading, setQuery } = useQuery(store =>
    store ? store.loadInitialMessages() : null
  );
  if (!store || error) return <div>error</div>;
  if (!store.messages.size) return <div></div>;
  return (
    <>
      <ul>
        {store.sortedMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
      {loading ? (
        <div />
      ) : (
        <button
          className="loadmore"
          onClick={() => {
            setQuery(store.loadMore());
          }}
        >
          Load more...
        </button>
      )}
    </>
  );
});
