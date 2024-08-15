const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BUcjMxR0JqSlJIMlhvUUMzYzdkRkJGUHhmZFZ5NTNQcFZsYUNqVHBtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGVLdmsvUm5KbkFrVDJHR2E2b2tncE55UUZ2UENMU0Ewd1JQVSs2b0FpND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TVczbVJmQXJNb2F4Q09NbjN1R2lTTXYyc3dyQ2Y2Rit5c1JtREZIcWtzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRem9LY2R0SjdoK2Nad2dScHlYWjNFZ3c5N3FYaXFqWlh3MXNRb0wwVmw0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNBMURTbkJvbUdHR2JidjFlaUJiUTlzbVZmeVlrRGR1NVV2ZnVabzR3MlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNjOEt1eGJoL3hmNE1RNkozaW5URXMySmxqRlBJZEJudjRPc25mejF2UkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0VHem9QWHVXbUJBRnM0UDYvT0FzMXhwcEhDcDJxdm1nZHBUc1AwZStGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTJzelZxZlpxeWh6SmpDSE03TGpGUVBGSzRKTytYblhRdDJRb01xZlF4TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im0xTDJKZ2dtQ3ZzRDZLV01EVmxERVc1K2RxelByL3VYUXlBVUIzZXR2cjU2dkF3U0lVRmZPZHVPZlJQY1ExUS9MaUN2R3NkS3AweGJLQXZ4WFBtY0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUsImFkdlNlY3JldEtleSI6InRhSHlFaW40M29TNi9lbVpKY0F2R2dYU1FyR3psS0QvYjFCdGlEdDN6aGc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE4NzYxOTE2MTU0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM2Qjk3NjAwMDY5NjEzQkQ5OEJGNEY1MjQ4ODJDRjVFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjM2NTA3MDR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxODc2MTkxNjE1NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQkY0NzNGNTMzQzAxRjlBODY2NDg0RDFBOEZBMThGRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNjUwNzA0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTg3NjE5MTYxNTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODc2REZDOTM0MDdENEFGMEM5QjREQkIwOEFBMTdBMkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMzY1MDcwNX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE4NzYxOTE2MTU0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjExQ0U5QUEzNDA3Rjg3NEQyMERGN0QyMTkzM0EzNzhBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjM2NTA3MDV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVfYTltbkhBUlYyVzA2RnhBenJwYlEiLCJwaG9uZUlkIjoiYjY2NTVmMzQtYzFmMi00ZDc3LWEzZjMtZTQ2M2IxNzBlYjEzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJvUUxvUXB3U0kybGpibzhEWDRsQUY3c0JpWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZajlpV0NuZXlHdXBsTFlFTkUvQnNzSm5KY2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRjhEQVg0UEEiLCJtZSI6eyJpZCI6IjkxODc2MTkxNjE1NDoxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IktlbnBhY2hpIHphcmFraSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGVzaGd3UWdxWHp0UVlZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVHVET0NySFkxVG96cHlBVVVrakJzR1MwczFEMGh2N2s1ZHhpWXVvdUJRdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiM2NET3VCN3VvaFRWbTlwSldRLzBSNGRvS3R0bEN5S21aTGo0UlRPUDVUeW1ZUjJmeThFQ2tNQmRJNFdjcitqK0RXbjFkZjB3bmprQXF5N2wvN0Z4Q1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImpwTlFmRG0xenBrak1iKzJUVHpXTkF5d2lDTXVjTmJHQzJ4S1BiU1FsYlFaSUJ4bnM1OWhLNFdIUkZibythNFJ1Z1JncVVLUEo2ZGFkN3N3MEhmb0RBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4NzYxOTE2MTU0OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVTdnemdxeDJOVTZNNmNnRkZKSXdiQmt0TE5ROUliKzVPWGNZbUxxTGdVTSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzY1MDcwMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEamQifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "lerik",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "918761916154", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
