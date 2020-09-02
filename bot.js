var TelegramBot = require('node-telegram-bot-api');

var token = 'ВАШ ТОКЕН';
var bot = new TelegramBot(token, { polling: true });
const request = require('request');

request('https://www.nbrb.by/api/exrates/rates/145',
 function (error, response, body) {
  var obj = JSON.parse(body);
   NAME = obj.Cur_Name;
   RATE = obj.Cur_OfficialRate;
   return obj;
});

request(' https://www.nbrb.by/api/exrates/rates/292',
 function (error, response, body) {
  var obj2 = JSON.parse(body);
   NAME2 = obj2.Cur_Name;
   RATE2 = obj2.Cur_OfficialRate;
   return obj2;
});


request(' https://www.nbrb.by/api/exrates/rates/298',
 function (error, response, body) {
  var obj3 = JSON.parse(body);
   NAME3 = obj3.Cur_Name;
   RATE3 = obj3.Cur_OfficialRate;
   return obj3;
});

 var variants = [
  {
    title:'Курс какой валюты хотите узнать?',
    buttons: [
        [{ text: '\u{1F4B2}', callback_data: '1' }],
        [{ text: '\u{1F4B6}', callback_data: '2' }],
        [{ text: '\u{20BD}', callback_data: '3' }],
      ],
      
    
  }
];

function getRandom(){
  return variants[Math.floor(Math.random()*variants.length)];
}

function babki(msg)
{
  var arr = getRandom();
  var text = arr.title;

  var options = {

      disable_web_page_preview: false,
      reply_markup: JSON.stringify({
      inline_keyboard: arr.buttons,
      parse_mode: 'Markdown'
    })
  };

chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
bot.sendMessage(chat,text, options);
}




bot.onText(/[0-9]/, function (msg, match) {
  convert(msg);
  babki(msg);
});



bot.on('callback_query', function (msg) {
    let answer = msg.data;

    switch (answer) 
    {
    case '1':
    {
      bot.sendMessage(msg.from.id, NAME + '\n'  +'ЦБ: ' + RATE.toFixed(3));
      break;
    } 
    case '2': 
    {
      bot.sendMessage(msg.from.id,NAME2 + '\n' +'ЦБ: ' + RATE2.toFixed(3));
      break;
    }
    case '3':

    {
      bot.sendMessage(msg.from.id,'100 ' +NAME3 + '\n' +'ЦБ: ' + RATE3.toFixed(3));
      break;
    }  
     default: bot.sendMessage(msg.from.id, " Oops,error ");
    
  }
  babki(msg);
  
    
  });
  function convert(msg)
{
  C = msg.text * RATE ;
  D = msg.text * RATE2 ;
  R = msg.text /RATE3/10 ;
  bot.sendMessage(msg.from.id,'\u{1F4B2}    ' + C.toFixed(2) + ' BYN \n' 
   +'\u{1F4B6}    ' +  D.toFixed(2) + ' BYN \n'
    +'  \u{20BD}       ' +  R.toFixed(2) + ' BYN ');


}
  bot.on("polling_error", (err) => console.log(err));
