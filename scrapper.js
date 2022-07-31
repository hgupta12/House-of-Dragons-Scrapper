const puppeteer = require('puppeteer');

const start = async ()=>{
    let url = "https://www.imdb.com/title/tt11198330/fullcredits";
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);

    await autoScroll(page);
    let data = await page.evaluate(()=>{
        let imgs = [];
        let chars = [];
        let acs = [];
        const images = document.querySelectorAll("td.primary_photo > a");
        images.forEach(img=>{
            imgs.push(img.childNodes[0].src);
        })
        const characters = document.querySelectorAll("td.character >a:first-child");
        const actors = document.querySelectorAll("td.primary_photo + td");
        actors.forEach(actor=>{
            acs.push(actor.querySelector('a').innerHTML.trim())
        })
        let data=[];
        characters.forEach((char,index)=>{
            chars.push(char.innerHTML);
            data.push({
              imageUrl: imgs[index],
              characterName: char.innerHTML,
              actorName: acs[index],
            });

        })
        return data;
    })
    await browser.close();
    return data;
} 

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 300;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= (scrollHeight - window.innerHeight)/3) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });
}


module.exports = start;