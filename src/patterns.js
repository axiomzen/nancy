const Parzen = require('parzen-js');
const P = Parzen.default;
const { API, seq, or } = Parzen;
const { weatherForTime } = require('./weather');

/*
 * Patterns
 */

if (!process.env.PARZEN_API_KEY) {
  throw new Error('PARZEN_API_KEY environment variable is required');
}

const api = new API(process.env.PARZEN_API_KEY);

// Patterns that will match to the text
// order here matters!
module.exports.patterns = [
  // Greeting pattern
  {
    pattern: seq(
      or(P.like('hello'), P.like('hey')),
      P.until(or(P.person(), P.propn()), { name: 'name' })
    ),
    res: match => {
      const { name } = match.captures;
      return `Hi ${name.text} :wave: I'm Nancy!`;
    }
  },
  // Weather pattern
  {
    pattern: seq(
      P.until(P.word('weather')),
      P.until(P.date(), { name: 'date' })
    ),
    res: async match => {
      const { date } = match.captures.date;
      if (date) {
        return weatherForTime(date);
      }
    }
  }
];

module.exports.definePatterns = async patterns =>
  await Promise.all(
    patterns.map(async p => {
      return {
        pattern: p.pattern,
        res: p.res,
        parser: await api.define(p.pattern)
      };
    })
  );

module.exports.runPatterns = async (patterns, text) => {
  for (let i = 0; i < patterns.length; i += 1) {
    const { parser, res } = patterns[i];
    const match = await parser.parse(text);
    if (match.successful) {
      return await res(match);
    }
  }
};
