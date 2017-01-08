var pug = require('pug');
var fs = require('fs');

songs = [
  "Bad Religion - Sinister Rouge",
  "Bad Religion - Los Angeles is burning",
  "Beirut - Elephant Gun",
  "Aznavour - Emmenez-moi",
  "Renaud - C'est pas l'homme",
  "Andréas & Nicolas - Jour de marché",
  "Mute - Bates Motel",
  "Francis Cabrel - La Corrida",
  "Tryo - l'hymne de nos Campagnes",
  "Tryo - Con par raison",
  "Tryo - Le petit chose",
  "Tryo - La crise",
  "Tryo - Désolé pour hier soir",
  "Tryo - Les extrèmes",
  "Muse - Starlight",
  "Enter Shikary - System Meltdown",
  "Paramedicsss - Pirates",
  "Paramedicsss - War",
  "Paramedicsss - The One",
  "Paramedicsss - Make me a Sandwich",
  "Paramedicsss - Why",
  "Paramedicsss - Amsterdam",
  "Rhapsody - Emerald Sword",
  "Paramedicsss - Camping Trip @ Z",
  "SBS - Monkey"
]
fs.watch('lyrics.html.pug', function () {

  var html = pug.renderFile('lyrics.html.pug', songs);


  console.log("###")
  console.log(html)

  fs.writeFile("index.html", html, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
})