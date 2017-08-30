# Nancy 👵

Slack bot using [Parzen](https://parzen.ai/).

## Usage

### API Keys

You need a few API keys before you can start using the Slack bot.

Obtain a Slack API token by adding a [custom bot integration](https://api.slack.com/bot-users) to your team. The token can be found in the configuration of the integration.

To get weather information for a given day, we use the [Dark Sky API](https://darksky.net). You can signup for free [here](https://darksky.net/dev).

Finally, you need a Parzen API key. Please signup for beta access [here](https://www.parzen.ai/), and we will give you an API key.

### Running

- `cp .env.example .env` and fill in your API keys
- `source .env` to load the keys
- `yarn install`
- `yarn start`

## License

This repo uses the [MIT License](https://github.com/axiomzen/nancy/blob/master/LICENSE)
