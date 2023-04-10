import pkg from "@atproto/api";
const { BskyAgent } = pkg;
import * as dotenv from "dotenv";
import process from "node:process";
dotenv.config();

const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (evt, sess) => {
    // store the session-data for reuse
  },
});

await agent.login({
  identifier: process.env.BSKY_USERNAME!,
  password: process.env.BSKY_PASSWORD!,
});

const bloot = "You can find the code for this bleet >>>here<<<";
await agent.post({
  text: bloot,
  entities: [
    {
      index: { start: bloot.indexOf(">>>") + 3, end: bloot.indexOf("<<<") },
      type: "link",
      value: "https://github.com/aliceisjustplaying/bluesky-experiments",
    },
  ],
});
