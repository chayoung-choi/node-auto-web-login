const puppeteer = require('puppeteer');
const CommonUtils = require('./CommonUtils');
const fs = require('fs');
const jsonFile = fs.readFileSync('./config.json', 'utf8');
const jsonData = JSON.parse(jsonFile);
const SITE_NAME = "dk-play";

(async () => {

    const config = jsonData[SITE_NAME];

    const lastRunTime = CommonUtils.getLastRunTime(config.log_file_path);

    // 시간 외 접근
    if (!CommonUtils.checkRunTime(config.run_time, lastRunTime)) {
        console.log("실행 시간이 아닙니다.");
        return;
    }

    let btnId, mode = "";
    if (CommonUtils.isEqualCurrentHoursOfDate(8)) {
        // 출근
        btnId = "#workIn";
        mode = "on";
    } else if (CommonUtils.isEqualCurrentHoursOfDate(18)){
        // 퇴근
        btnId = "#workOut";
        mode = "off";
    }

    console.log("실행을 시작합니다.", mode);

    // 1초 ~ 2분 사이 랜덤
    const min = 1;
    const max = 120;
    const M = CommonUtils.getRandomBetweenMinAndMax(min, max);

    // launch 메서드는 chrome을 실행시킴. headless는 ui를 제공하는지 안하는지 여부임. false로 해야 ui가 뜨고 아니면 백그라운드에서만 켜짐
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});

    // 새롭게 페이지를 만든다.
    const page = await browser.newPage();

    // goto는 url로 이동하는 메서드
    await page.goto(config.url);

    // 랜덤으로 접근하기 위한 딜레이
    await page.waitForTimeout(M*1000);

    await page.type('#username', config.id);
    await page.type('#password', config.pw);
    await page.click('#login_submit');

    await page.waitForSelector('.profile');
    await page.click('#main-menu [title="근태관리"]');

    await page.waitForTimeout(5000);
    if (mode === "off"){
        try {
            // 출석체크한 경우만 실행
            let state = await page.$eval("#workIn.off", (data) => data);
        } catch (e){
            await browser.close();
            return;
        }
    }

    await page.waitForSelector(btnId);
    await page.click(btnId);
    // 완료 로그
    fs.appendFileSync(config.log_file_path, (new Date()).toISOString() +"|"+(new Date()).toLocaleString()+"|"+mode +  "\n");
    console.log("END] " + config.site);
    await browser.close();
})();
