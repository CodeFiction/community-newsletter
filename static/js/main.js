(function(window) {
  window.Logo = React.createElement("img", { src: "./img/logo.svg" });

  window.MainBody = class MainBody extends React.Component {
    render() {
      return React.createElement(
        "div",
        { className: "main-body container" },
        React.createElement(Header, null),
        React.createElement(MessageList, null)
      );
    }
  };
  window.Header = class Header extends React.Component {
    render() {
      const brand = React.createElement(
        "div",
        { className: "brand" },
        Logo,
        React.createElement("span", { className: "brand--title" }, "Gündem")
      );
      const main = React.createElement("div", { className: "header" }, brand);
      return main;
    }
  };
  window.MessageItem = class MessageItem extends React.Component {
    render() {
      const reactionCounts = React.createElement(
        "small",
        null,
        `[${this.props.reactionCount}] 👍 `
      );
      const text = this.props.text.replace(this.props.link, "");
      const hasText = !!text;
      const linkTo = React.createElement("span", null, ` (${this.props.link})`);
      const linkItem = React.createElement(
        "a",
        { href: this.props.link, className: "message-item" },
        hasText ? text : this.props.link,
        hasText ? linkTo : null
      );
      return React.createElement("li", null, reactionCounts, linkItem);
    }
  };
  window.MessageList = class MessageList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { messages: [] };
    }
    render() {
      const { messages } = this.state;
      const messageItems = [];
      let content;
      messages.forEach(message => {
        messageItems.push(
          React.createElement(MessageItem, {
            reactionCount: message.reactionCount,
            text: message.text,
            link: message.links[0]
          })
        );
      });

      if (!messages.length) {
        content = React.createElement(
          "div",
          { className: "loading-spinner" },
          "Yükleniyor..."
        );
      } else {
        content = React.createElement(
          "ol",
          { className: "data-list" },
          ...messageItems
        );
      }
      return React.createElement("div", { className: "content" }, content);
    }

    componentDidMount() {
      fetch("https://cf-community-news.herokuapp.com/messages")
        .then(response => response.json())
        .then(messages => this.setState({ messages }));
    }
  };
})(window);
