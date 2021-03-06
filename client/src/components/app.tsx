import { h } from "preact";
import { Router } from "preact-router";

import { Header } from "./header";
import { MessageList } from "./message-list";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

function App() {
  return (
    <div className="main-body container">
      <Header />
      <Router>
        <MessageList key="1" path="/" />
        <MessageList key="1" path="/general" channelId={"C0MFTF0Q4"} />
        <MessageList key="3" path="/siber-guvenlik" channelId={"CTKGFDWKA"} />
        <MessageList key="4" path="/gaming" channelId={"CQ01KDCTE"} />
        <MessageList key="5" path="/random" channelId={"CKX5L3UTS"} />
        <MessageList
          key="6"
          path="/uzaktan-calisanlar"
          channelId={"C010284QJ1E"}
        />
        <MessageList
          key="7"
          path="/covid19-haberleri"
          channelId={"CVB7MGSV7"}
        />
      </Router>
    </div>
  );
}

export default App;
