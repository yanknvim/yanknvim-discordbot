import { createBot, Intents, startBot } from "https://deno.land/x/discordeno@13.0.0/mod.ts";
import "https://deno.land/std@0.191.0/dotenv/load.ts";

const bot = createBot({
  token: Deno.env.get("DISCORD_TOKEN"),
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
  events: {
    ready() {
      console.log("Bot is ready");
    }
  }
});

bot.events.messageCreate = (b, message) => {
  if (message.content.startsWith("y!ping")) {
    const ping = Date.now() - message.timestamp;
    b.helpers.sendMessage(message.channelId, {
      content: `**Pong!**\nPing: ${ping}ms`
    })
  }
  if (message.content.startsWith("y!dice")) {
    const tmp = message.content.split(' ');
    const prefix = (tmp.length >= 2) ? tmp[1].split('d') : [1, 6];

    var total = 0;
    var dices = [];
    for (var i = 0; i < Number(prefix[0]); i++) {
      const dice = Math.floor(Math.random() * Number(prefix[1])) + 1;
      total += dice;
      dices.push(dice);
    }

    b.helpers.sendMessage(message.channelId, {
      content: `Result: ${total} (${dices.join(", ")})`
    })
  }
  if (message.content.startsWith("y!help")) {
    b.helpers.sendMessage(message.channelId, {
      content: "- **y!ping**: Show ping\n- **y!dice**: Do diceroll(like 1d100)"
    })
  }

};

await startBot(bot);
