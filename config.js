require("dotenv").config();

module.exports = {
    tmi: {
        options: {
            debug: true
        },
        connection: {
            reconnect: true
        },
        identity: {
            username: process.env.TWITCH_BOT_USERNAME,
            password: process.env.TWITCH_BOT_OAUTH_TOKEN
        },
        channels: ["cdnthe3rd"]
    },
    twitchstream: {
        endpoint: process.env.TWITCH_STREAM_ENDPOINT,
        streamkey: process.env.TWITCH_STREAM_KEY
    }
};
