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
  if (message.content === "y!ping") {
    const ping = Date.now() - message.timestamp;
    b.helpers.sendMessage(message.channelId, {
      content: `**Pong!**\nPing: ${ping}ms`
    })
  }
};

await startBot(bot);
