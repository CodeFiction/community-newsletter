import { h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import { Header } from "./header";
import { MessageList } from "./message-list";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

function App() {
  let currentUrl: string;
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url;
  };

  return (
    <div className="main-body container">
      <Header />
      <Router onChange={handleRoute}>
        <MessageList path="/" />
        <MessageList path="/general" />
        <MessageList path="/siber-guvenlik" channelId={"CTKGFDWKA"} />
        <MessageList path="/gaming" channelId={"CQ01KDCTE"} />
        <MessageList path="/random" channelId={"CKX5L3UTS"} />
      </Router>
    </div>
  );
}

export default App;
