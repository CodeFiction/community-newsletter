(function(window) {
  window.Logo = React.createElement('img', { src: './img/logo.svg' });

  window.App = class App extends React.Component {
    render() {
      return React.createElement(
        'div',
        { className: 'main-body container' },
        React.createElement(Header, null),
        React.createElement(MessageList, null)
      );
    }
  };

  window.Header = class Header extends React.Component {
    render() {
      const brand = React.createElement(
        'div',
        { className: 'brand' },
        Logo,
        React.createElement('span', { className: 'brand--title' }, 'Gündem')
      );
      const main = React.createElement('div', { className: 'header' }, brand);
      return main;
    }
  };

  window.MessageItem = class MessageItem extends React.Component {
    render() {
      const thumbsIcon = React.createElement('img', {
        src: './img/thumb-up-line.svg',
        className: 'thumbs-icon',
      });

      const reactionCounts = React.createElement(
        'div',
        { className: 'reaction-count' },
        thumbsIcon,
        this.props.reactionCount
      );

      // const Avatar = React.createElement(
      //   'div',
      //   { className: 'avatar' },
      //   React.createElement('img', {
      //     src:
      //       'https://cdn.simplecast.com/images/fd86831a-df45-467f-9650-18403ef704e8/e4c2780a-560b-4efc-8b3b-34c07adc288d/640x640/1537702028artwork.jpg',
      //     width: 36,
      //     loading: 'lazy',
      //   })
      // );

      const UserInfo = React.createElement(
        'h2',
        { className: 'username' },
        'Codefiction',
        React.createElement(
          'span',
          null,
          new Date(this.props.timestamp * 1000).toLocaleString()
        )
      );

      const text = this.props.text.replace(this.props.link, '');

      const hasText = !!text;

      const messageLink = React.createElement(
        'div',
        { className: 'message--link' },
        React.createElement('img', {
          src: './img/external-link.svg',
          width: '16px',
        }),
        `${this.props.link}`
      );

      const linkItem = React.createElement(
        'a',
        { href: this.props.link, className: 'message--content' },
        hasText ? text : this.props.link,
        hasText ? messageLink : null
      );

      const messageHeader = React.createElement(
        'div',
        { className: 'message--header' },
        React.createElement(
          'div',
          { className: 'user-info' },
          // Avatar,
          UserInfo
        ),
        reactionCounts
      );

      return React.createElement(
        'div',
        { className: 'message' },
        messageHeader,
        linkItem
      );
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
            link: message.links[0],
            timestamp: message.timestamp,
          })
        );
      });

      if (!messages.length) {
        content = React.createElement(
          'div',
          { className: 'loading-spinner' },
          'Yükleniyor...'
        );
      } else {
        content = React.createElement(
          'div',
          { className: 'data-list' },
          ...messageItems
        );
      }
      return React.createElement('div', { className: 'content' }, content);
    }

    componentDidMount() {
      fetch('https://cf-community-news.herokuapp.com/messages')
        .then(response => response.json())
        .then(messages => this.setState({ messages }));
    }
  };
})(window);
