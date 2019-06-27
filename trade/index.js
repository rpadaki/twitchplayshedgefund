require("dotenv").config();
const Alpaca = require("@alpacahq/alpaca-trade-api");

/*
 * could set keyId, secretKey, and paper here,
 * but I opted to do it with the environment variables
 * APCA_API_KEY_ID, APCA_API_SECRET_KEY, and APCA_BASE_URL
 * instead.
 *
 * To actually load keys, I would add the relevant
 * JSON in "../config.js" and load from ../.env
 * there.
 */
const alpaca = new Alpaca();

alpaca.getAccount().then(account => {
    console.log("Current Account:", account);
    alpaca.getBars("day", "AAPL", { limit: 1 }).then(data => {
        console.log(data);
    });
});
