const neatCsv = require('neat-csv');
const fs = require('fs')

fs.readFile('./file.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let jsonObject = await neatCsv(data);
    let newJsonObject = jsonObject.map((item, index) => {
        return {
            value: item.title,
            synonyms: [item.title, item.original_title]
        }
    })

    let newArr = newJsonObject.slice(0, 10000);
    let jsonData = JSON.stringify(newArr);
    writeResultFile(jsonData);
  })


const writeResultFile = (jsonData) => {
    fs.writeFile("output.json", jsonData, 'utf8', function (err) {

        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}