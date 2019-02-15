module.exports = {
  tmioptions: {
    options: {
      debug: true
    },
    connection: {
      reconnect: true
    },
    identity: {
      username: process.env.TWITCH_USERNAME,
      password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: ["cdnthe3rd"]
  }
};
