var http = require("http");
var fs = require("fs");
var url = require("url");
var server = http.createServer();
var data = fs.readFileSync("data.json");
var output = JSON.parse(data);
var data = (data+" ");
// var oData=

function product(id)
{
    var productPage = fs.readFileSync("./product.html");
    productPage = productPage + "";
    productPage = productPage.replace(/{#image#}/g, output[id]["image"]);
    productPage = productPage.replace(/{#Description#}/g, output[id]["description"]);
    productPage = productPage.replace(/{#From#}/g, output[id]["from"]);
    productPage = productPage.replace(/{#Nutrients#}/g, output[id]["nutrients"]);
    productPage = productPage.replace(/{#quantity#}/g, output[id]["quantity"]);
    productPage = productPage.replace(/{#Price#}/g, output[id]["price"]);
    productPage = productPage.replace(/{#Productname#}/g, output[id]["productName"]);
    productPage = productPage.replace(/{#organic#/g, output[id]["organic"]);
   return productPage;
}

function replace(id)
{
    console.log(id);
    console.log(output[id]);
    var cardTemp = fs.readFileSync("./cardTemp.html");
    cardTemp = cardTemp + "";
    cardTemp = cardTemp.replace(/#image#/g, output[id]["image"]);
    cardTemp = cardTemp.replace(/#quantity#/g, output[id]["quantity"]);
    cardTemp = cardTemp.replace(/#Price#/g, output[id]["price"]);
    cardTemp = cardTemp.replace(/#Productname#/g, output[id]["productName"]);
    if(output[id]["organic"] === false)
    {
        cardTemp = cardTemp.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }
    
   return cardTemp;
}

function overviewRep(cards)
{
    var overview = fs.readFileSync("./overview.html");
    overview = overview + "";
    overview = overview.replace(/#CARDS#/g,cards);
    return overview;
}
var server = http.createServer(function (req, res) 
{
    var parsedUrl = url.parse(req.url,true);
        console.log(parsedUrl);

    if (req.url == "/api") 
    {
        res.writeHead(200, { "Content-type": "application/json" });
        res.write((data));
    } 
    else if (parsedUrl.pathname == "/product") 
    { 
        var id = parsedUrl.query.id;
        var ans = product(id);
        res.write(ans);
    } 
    else if (req.url == "/overview" || req.url == "/" || req.url === "") 
    {
        var cards = "";
        for(var i = 0 ; i<output.length ; i++)
        {
            cards += replace(i);
        }
        var ans = overviewRep(cards);
        res.write(ans);
    } 
    else 
    {
        `// console.log(req.url);
        console.log("``````");
        // var productId=url.parse(req.url,true).query.id;
        // console.log(productId);
    
        // console.log(url.parse(req.url,true));
        // res.write(req.url);
        // res.write(""+));
    
        // res.write("Error 404 Page Not found");
    }
    res.end();
});
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("server is at port 3000");
})