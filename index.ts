import pkg from '@atproto/api';
const { BskyAgent } = pkg;
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

const agent = new BskyAgent({
  service: 'https://bsky.social',
  persistSession: (evt, sess) => {
    // store the session-data for reuse
  },
});

await agent.login({
  identifier: process.env.BSKY_USERNAME!,
  password: process.env.BSKY_PASSWORD!,
});

const bloot =
  'You can find the code for this bleet >>>here<<<, now with a link card that has a nice title and description!';
await agent.post({
  text: bloot,
  entities: [
    {
      index: { start: bloot.indexOf('>>>') + 3, end: bloot.indexOf('<<<') },
      type: 'link',
      value: 'https://github.com/aliceisjustplaying/bluesky-experiments',
    },
  ],
  // facets: [
  //   {
  //     index: { byteStart: bloot.indexOf('>>>') + 3, byteEnd: bloot.indexOf('<<<') },
  //     features: [
  //       {
  //         $type: 'app.bsky.richtext.facet#link',
  //         uri: 'https://github.com/aliceisjustplaying/bluesky-experiments',
  //       },
  //     ],
  //   },
  // ],
  embed: {
    $type: 'app.bsky.embed.external',
    external: {
      uri: 'https://github.com/aliceisjustplaying/bluesky-experiments',
      title: "alice's bluesky experiments",
      description: "now i'm just playing around with the api",
    },
  },
});
