const Botkit = require('botkit');
const { patterns, definePatterns, runPatterns } = require('./patterns');

// Ensure we have the api tokens
if (!process.env.SLACK_API_TOKEN) {
  throw new Error('SLACK_API_TOKEN environment variable is reqiured.');
}

// Create a Botkit controller to communicate with Slack
const controller = Botkit.slackbot({ debug: false });

// Setup the webserver on specific port
const port = process.env.PORT || 4000;
controller.setupWebserver(port, err => {
  if (err) console.log(err);
  console.log(`Magic happens on port ${port}`);
});

// Start Botkit and connect to Slack
controller.spawn({ token: process.env.SLACK_API_TOKEN }).startRTM();

definePatterns(patterns).then(patterns =>
  controller.hears(
    '.*',
    ['mention', 'direct_mention', 'direct_message'],
    async (bot, message) => {
      console.log(`Message: ${message.text}`);

      const response = await runPatterns(patterns, message.text);
      if (response) {
        bot.reply(message, response);
      }
    }
  )
);
