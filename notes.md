# Difficult Connections

## Streaming headless to Twitch

We will need a low-latency utility, most likely written in C or C++, that will generate our realtime view as a buffer and pipe the buffer to `ffmpeg`. Meanwhile, `ffserver` will be managing our ports and access, so that `ffmpeg` can stream to the server at [rmtp://twitch.tv](https://stream.twitch.tv/ingests/).

## Getting viewer interaction from Twitch

I'll need to take a look at the source for the node package `tmi`, which handles interaction with Twitch chat. In particular, if our low-latency streaming utility needs to be written in C or C++, it would serve to reimplement `tmi` in the same language. Otherwise, we will need to pipe processed chat data into our view creator.

## Getting market info and making trades

While mildly sketchy, I'm going to try out <https://aplaca.markets> for now.

# Project Diagram

```
                                                      AWS or Heroku Server

                             +--------------------------------------------------------------+
   +---------------------+   |                                                              |
   |                     |   |  Encode and send video stream                                |
   |                     |   |                                                              |
   |    Twitch Stream <---------+ ffmpeg <----------+ Render market data and voting options |
   |                     |   |                      +                                       |
   |         +           |   |                                                              |
Show position|and options|   |                NodeJS Server <---------------+ Request market data and generate orders from votes
   |         |           |   |                                              v               |
   |         v        Parse chat and record votes   ^                                       |
   |                     |   |                      |               alpaca-trade-api-js     |
   |    Twitch Chat +------------> tmi +------------+                                       |
   |                     |   |                                              ^               |
   |         +           |   |                                              | Retrieve market data and submit buy/sell orders
   |     Make|donations  |   +--------------------------------------------------------------+
   +---------------------+                                                  |
             v       Collect and store money                 Fund purchases v

        Venmo/Paypal +-----------------> Personal Bank Account +-------> Alpaca

                                                                            ^
                                                                            | Source data and fulfil orders
                                                                            |
                                                                            v

                                                                    Real-Life Markets
