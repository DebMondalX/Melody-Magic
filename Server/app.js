const http = require("http");
var SpotifyWebApi = require("spotify-web-api-node");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

fs = require("fs");
csv = require("csv-parser");

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function getRequestBody(req) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  let data = Buffer.concat(buffers).toString();
  data = JSON.parse(data);
  return data;
}

function dataValidity(data) {
  if (typeof data.data !== "object") return false;
  if (data.data.length === 4) {
    const flag = 1;
    for (const element of data.data) {
      if (element < 0 || element > 5) {
        flag = 0;
        break;
      }
    }

    return flag;
  } else {
    return false;
  }
}

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function (data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);
function newToken() {
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      console.log(data.body["access_token"]);
    },
    function (err) {
      //Error management
      console.log(err);
    }
  );
}

//And set an interval to "refresh" it
//(actually creating a new one) every hour or so
tokenRefreshInterval = setInterval(newToken, 1000 * 50 * 60);

//processing song details in appropriate format
const cache = {};
fs.createReadStream("./songID_precompute.csv")
  .pipe(csv())
  .on("data", row => {
    let text = row.recommendation;
    text = text.substr(2, text.length - 4);
    cache[row.song_name] = text.split(`', '`);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
//for implementing Matrix Factorization
var jsrecommender = require("js-recommender");
var recommender = new jsrecommender.Recommender();

var table = new jsrecommender.Table();
//list of songs available in personalised playlist:
const arr = [
  { name: "Tu Miranda", id: "0ITiP8ZhU0kDc4O6KWV8Hv" },
  { name: "The Veldt - 8 Minute Edit", id: "7oPqRSubaWcDb5F68aw3P6" },
  { name: "Knock Knock", id: "6cthJIumjsMpJBeDJ2w6Dn" },
  { name: "Invincible", id: "1zBBo7indT2foQGQUoloWj" },
  { name: "Let Yourself Go", id: "5pP3WtXwZ6HjcbuJ3vhDTZ" },
  { name: "Mariposa de Barrio", id: "02ykJXbTaAyxPgaicIRxo4" },
  { name: "For You", id: "64bWFjtzBRVSllQz9H2RAY" },
  { name: "Walk of Shame", id: "6l2Q66TlfZqzbRkFrZOMT1" },
  { name: `It's Nothin (feat. 2 Chainz)`, id: "2o6Vyac7vIU35VMqhVV3qA" },
  { name: "Man In The Mirror", id: "2qshskkXkMye1IpWcZvIPW" },
  { name: "Angeleyes", id: "1zZLRpTzRTqPQ7G7uxYI9Y" },
  { name: `Barrett's Privateers`, id: "3TLhkXFenusy509GrA8RUL" },
  { name: "Mundo de Piedra", id: "4fhF0iJffyUJReKSecg78m" },
  { name: "Leathers", id: "0RLhtEt50QUwKXNwKI4dSJ" },
  {
    name: "Rella (feat. Hodgy, Domo Genesis & Tyler, The Creator)",
    id: "3v7GtykYEMuSg4dQyw4qZb",
  },
  { name: "Aliens Fighting Robots", id: "5UA5ownmiX7KlCfEjfx8Eu" },
  { name: "The Hurt & The Healer", id: "1R0OILfWpYasl5pNrN4zDl" },
  { name: "Sails to the Wind", id: "5tEaZFMFvJF0vrNZLVZRDm" },
  { name: "D.D.", id: "0d2nqd8iWUX0BpLo6Lg2C8" },
  { name: "Every Night", id: "3WQZfz5DLbO2vnJDWNxRBf" },
];
//initialising choices for user 'A'
//table.setCell(songName, username, rating)
table.setCell(arr[0].name, "A", 4);
table.setCell(arr[1].name, "A", 0);
table.setCell(arr[2].name, "A", 1);
table.setCell(arr[3].name, "A", 5);
table.setCell(arr[4].name, "A", 3);
table.setCell(arr[5].name, "A", 5);
table.setCell(arr[6].name, "A", 1);
table.setCell(arr[7].name, "A", 0);
table.setCell(arr[8].name, "A", 5);
table.setCell(arr[10].name, "A", 3);
table.setCell(arr[11].name, "A", 2);
table.setCell(arr[12].name, "A", 4);
table.setCell(arr[13].name, "A", 1);
table.setCell(arr[16].name, "A", 4);
table.setCell(arr[18].name, "A", 4);

//initialising choices for user 'B'
table.setCell(arr[0].name, "B", 5);
table.setCell(arr[3].name, "B", 2);
table.setCell(arr[4].name, "B", 4);
table.setCell(arr[5].name, "B", 3);
table.setCell(arr[6].name, "B", 5);
table.setCell(arr[7].name, "B", 4);
table.setCell(arr[8].name, "B", 2);
table.setCell(arr[9].name, "B", 3);
table.setCell(arr[10].name, "B", 4);
table.setCell(arr[11].name, "B", 5);
table.setCell(arr[13].name, "B", 1);
table.setCell(arr[14].name, "B", 4);
table.setCell(arr[16].name, "B", 2);
table.setCell(arr[17].name, "B", 1);

//initialising choices for user 'C'
table.setCell(arr[1].name, "C", 3);
table.setCell(arr[2].name, "C", 1);
table.setCell(arr[3].name, "C", 3);
table.setCell(arr[4].name, "C", 2);
table.setCell(arr[5].name, "C", 5);
table.setCell(arr[6].name, "C", 1);
table.setCell(arr[8].name, "C", 5);
table.setCell(arr[9].name, "C", 2);
table.setCell(arr[10].name, "C", 4);
table.setCell(arr[11].name, "C", 3);
table.setCell(arr[13].name, "C", 5);
table.setCell(arr[15].name, "C", 1);
table.setCell(arr[16].name, "C", 3);
table.setCell(arr[17].name, "C", 4);
table.setCell(arr[18].name, "C", 5);
table.setCell(arr[19].name, "C", 1);

//initialising choices for user 'D'
table.setCell(arr[0].name, "D", 4);
table.setCell(arr[1].name, "D", 2);
table.setCell(arr[2].name, "D", 4);
table.setCell(arr[4].name, "D", 5);
table.setCell(arr[6].name, "D", 3);
table.setCell(arr[7].name, "D", 4);
table.setCell(arr[9].name, "D", 3);
table.setCell(arr[10].name, "D", 4);
table.setCell(arr[11].name, "D", 5);
table.setCell(arr[12].name, "D", 0);
table.setCell(arr[13].name, "D", 4);
table.setCell(arr[14].name, "D", 3);
table.setCell(arr[15].name, "D", 2);
table.setCell(arr[16].name, "D", 3);
table.setCell(arr[18].name, "D", 5);
//initialising choices for user 'E'
table.setCell(arr[0].name, "E", 2);
table.setCell(arr[2].name, "E", 1);
table.setCell(arr[3].name, "E", 2);
table.setCell(arr[5].name, "E", 1);
table.setCell(arr[8].name, "E", 2);
table.setCell(arr[9].name, "E", 1);
table.setCell(arr[11].name, "E", 5);
table.setCell(arr[12].name, "E", 1);
table.setCell(arr[13].name, "E", 4);
table.setCell(arr[15].name, "E", 3);
table.setCell(arr[17].name, "E", 1);
//initialising choices for user 'F'
table.setCell(arr[1].name, "F", 1);
table.setCell(arr[2].name, "F", 2);
table.setCell(arr[3].name, "F", 1);
table.setCell(arr[4].name, "F", 4);
table.setCell(arr[6].name, "F", 2);
table.setCell(arr[7].name, "F", 5);
table.setCell(arr[9].name, "F", 2);
table.setCell(arr[11].name, "F", 4);
table.setCell(arr[12].name, "F", 1);
table.setCell(arr[14].name, "F", 1);
table.setCell(arr[16].name, "F", 2);
table.setCell(arr[17].name, "F", 5);

const server = http.createServer(async function (req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (reqUrl.pathname === "/recommend") {
    const data = await getRequestBody(req);

    if (cache[data.name]) {
      spotifyApi.getTracks([data.id, ...cache[data.name]]).then(
        function (data) {
          res.writeHead(200, headers).end(JSON.stringify(data.body));
        },
        function (err) {
          console.log(err);
        }
      );
    } else {
      res.end();
    }
  } else if (reqUrl.pathname === "/popular") {
    const data = await getRequestBody(req);
    if (typeof data.songIds === "object" && data.songIds.length > 0) {
      // Get song metadata from Spotify and send response
      spotifyApi.getTracks(data.songIds).then(
        function (data) {
          res.writeHead(200, headers).end(JSON.stringify(data.body));
        },
        function (err) {
          console.log(err);
        }
      );
    } else {
      res.end();
    }
  } else if (reqUrl.pathname === "/personalised") {
    //set values from user to Table
    const data = await getRequestBody(req);

    if (dataValidity(data)) {
      table.setCell(arr[6].name, "user", data.data[0]);
      table.setCell(arr[19].name, "user", data.data[1]);
      table.setCell(arr[3].name, "user", data.data[2]);
      table.setCell(arr[18].name, "user", data.data[3]);

      //generate prediction for table
      const model = recommender.fit(table);
      predicted_table = recommender.transform(table);
      //get and arrange array of songs according to ratings
      const ratingArray = [];
      for (let i = 0; i < predicted_table.rowNames.length; i++) {
        const song = predicted_table.rowNames[i];
        const songObj = {
          name: song,
          rating: Math.round(predicted_table.getCell(song, "user")),
        };
        ratingArray.push(songObj);
      }
      ratingArray.sort((a, b) => (a.rating > b.rating ? -1 : 1));

      // Get top 10 song recommendations and associated song id
      const topIds = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (ratingArray[i].name === arr[j].name) {
            topIds.push(arr[j].id);
          }
        }
      }

      // Get song metadata from Spotify and send response
      spotifyApi.getTracks(topIds).then(
        function (data) {
          res.writeHead(200, headers).end(JSON.stringify(data.body));
        },
        function (err) {
          console.log(err);
        }
      );
    }
  } else {
    res.end();
  }
});

server.listen(PORT, function (error) {
  if (error) {
    console.log("something gone wrong", error);
  } else {
    console.log("Server is listening on port " + PORT);
  }
});
