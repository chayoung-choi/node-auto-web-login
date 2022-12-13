const puppeteer = require('puppeteer');
const CommonUtils = require('./CommonUtils');
const fs = require('fs');
const dayjs = require("dayjs");
const jsonFile = fs.readFileSync('./config.json', 'utf8');
const jsonData = JSON.parse(jsonFile);
const siteName = "dk-play";

(async () => {
    const data = jsonData[siteName];
    console.log("[START]", data.site);

    let btnId = "";
    if (CommonUtils.isEqualCurrentHourOfDate(data.startHour)) {
        // 출근
        btnId = "#workIn";
    } else if (CommonUtils.isEqualCurrentHourOfDate(data.endHour)){
        // 퇴근
        btnId = "#workOut";
    } else {
        // 시간 외 접근
        return;
    }

    // 1초 ~ 3분 사이 랜덤
    const min = 1;
    const max = 180;
    const M = CommonUtils.getRandomBetweenMinAndMax(min, max);

    // launch 메서드는 chrome을 실행시킴. headless는 ui를 제공하는지 안하는지 여부임. false로 해야 ui가 뜨고 아니면 백그라운드에서만 켜짐
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});

    // 새롭게 페이지를 만든다.
    const page = await browser.newPage();

    // goto는 url로 이동하는 메서드
    await page.goto(data.url);

    // 랜덤으로 접근하기 위한 딜레이
    console.log('[Goto Time]', dayjs().add(M/60, 'minute').format('YYYY-MM-DD HH:mm:ss'));
    await page.waitForTimeout(M*1000);

    await page.type('#username', data.id);
    await page.type('#password', data.pw);
    await page.click('#login_submit');

    await page.waitForSelector('.profile');
    await page.click('#main-menu [title="근태관리"]');

    await page.waitForTimeout(5000);

    await page.waitForSelector(btnId);
    await page.click(btnId);
    console.log("[END]", data.site);
    await browser.close();
})();
