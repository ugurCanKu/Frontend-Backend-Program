var http = require('http');
var fs = require('fs');
var express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
var mysql = require('mysql');

const plates = {
  "1": "ADANA",
  "2": "ADIYAMAN",
  "3": "AFYONKARAHİSAR",
  "4": "AĞRI",
  "5": "AMASYA",
  "6": "ANKARA",
  "7": "ANTALYA",
  "8": "ARTVİN",
  "9": "AYDIN",
  "10": "BALIKESİR",
  "11": "BİLECİKK",
  "12": "BİNGÖL",
  "13": "BİTLİS",
  "14": "BOLU",
  "15": "BURDUR",
  "16": "BURSA",
  "17": "ÇANAKKALE",
  "18": "ÇANKIRI",
  "19": "ÇORUM",
  "20": "DENİZLİ",
  "21": "DİYARBAKIR",
  "22": "EDİRNE",
  "23": "ELAZIĞ",
  "24": "ERZİNCAN",
  "25": "ERZURUM",
  "26": "ESKİŞEHİR",
  "27": "GAZİANTEP",
  "28": "GİRESUN",
  "29": "GÜMÜŞHANE",
  "30": "HAKKARİ",
  "31": "HATAY",
  "32": "ISPARTA",
  "33": "MERSİN",
  "34": "İSTANBUL",
  "35": "İZMİR",
  "36": "KARS",
  "37": "KASTAMONU",
  "38": "KAYSERİ",
  "39": "KIRKLARELİ",
  "40": "KIRŞEHİR",
  "41": "KOCAELİ",
  "42": "KONYA",
  "43": "KÜTAHYA",
  "44": "MALATYA",
  "45": "MANİSA",
  "46": "KAHRAMANMARAŞ",
  "47": "MARDİN",
  "48": "MUĞLA",
  "49": "MUŞ",
  "50": "NEVŞEHİR",
  "51": "NİĞDE",
  "52": "ORDU",
  "53": "RİZE",
  "54": "SAKARYA",
  "55": "SAMSUN",
  "56": "SİİRT",
  "57": "SİNOP",
  "58": "SİVAS",
  "59": "TEKİRDAĞ",
  "60": "TOKAT",
  "61": "TRABZON",
  "62": "TUNCELİ",
  "63": "ŞANLIURFA",
  "64": "UŞAK",
  "65": "VAN",
  "66": "YOZGAT",
  "67": "ZONGULDAK",
  "68": "AKSARAY",
  "69": "BAYBURT",
  "70": "KARAMAN",
  "71": "KIRIKKALE",
  "72": "BATMAN",
  "73": "ŞIRNAK",
  "74": "BARTIN",
  "75": "ARDAHAN",
  "76": "IĞDIR",
  "77": "YALOVA",
  "78": "KARABÜK",
  "79": "KİLİS",
  "80": "OSMANİYE",
  "81": "DÜZCE"
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'plates_db',
  port: '3307'
});

con.connect(function(err) {

  if (err) throw err;
  console.log("Connected!");
  
  for (var i = 1 ; i<82 ; i++) {

    const plateNumber = i;
    const cityName = plates[i];

    var sql = 'INSERT INTO plates (plate, name) SELECT * FROM (SELECT ?,?) AS tmp WHERE NOT EXISTS (SELECT name FROM plates WHERE name = ?) LIMIT 1';

    con.query(sql, [plateNumber, cityName, cityName], (err, result) => {
        if (err) throw err;
    });
  }
})


app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/try.html');
})

app.use('/', router);
app.listen(process.env.port || 3000);


app.get('/plates', (req,res) => 
{
    var sql = "SELECT * FROM plates";

    con.query(sql , function (err, result, fields) {

        if (err) throw err;
        res.send(result);
    });

});


app.post('/plate', (req, res) => 
{
    var value = req.body.plate; // value = city name

    var sql = "SELECT * FROM plates WHERE name = ?";

    con.query(sql, [value], function (err, result, fields) {
        
        if (err) throw err;
        res.send(result);
        
    }); 
});