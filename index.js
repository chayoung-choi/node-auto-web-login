const puppeteer = require('puppeteer');
const fs = require('fs');

const jsonFile = fs.readFileSync('./config.json', 'utf8');
const jsonData = JSON.parse(jsonFile);
console.log(jsonData.site);

(async () => {
    // launch 메서드는 chrome을 실행시킴. headless는 ui를 제공하는지 안하는지 여부임. false로 해야 ui가 뜨고 아니면 백그라운드에서만 켜짐
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});

    // 새롭게 페이지를 만든다.
    const page = await browser.newPage();

    // goto는 url로 이동하는 메서드
    await page.goto(jsonData.url);

    await page.click('.loginboxBtn');
    // await page.waitForTimeout(3000);

    await page.waitForSelector('#login_id');
    // 해당 탭에서 마우스 오른쪽 버튼 클릭 후 검사 버튼을 눌러 태그의 classname이나 id값을 알아내서 넣는다.
    await page.type('#login_id', jsonData.id);
    await page.type('#login_pw', jsonData.pw);
    await page.waitForSelector('.login-btn2');
    await page.click('.login-btn2');

    // 커뮤니티 선택
    await page.waitForSelector('#toplogo');
    await page.click('#gnb4 > li > span > a[href="/bbs/board.php?bo_table=b001"]');

    let left_menu = '#leftmenu a[href="/bbs/board.php?bo_table=com25"]';
    await page.waitForSelector(left_menu);
    await page.click(left_menu);

    let btn_write = 'a[href="./write.php?bo_table=com25"]';
    await page.waitForSelector(btn_write);
    await page.click(btn_write);

    let write_contents = '[name="wr_subject"]';
    await page.waitForSelector(write_contents);
    await page.type(write_contents, "출첵");
    await page.type('#login_pw', "출석체크입니다~~~~");
    await page.click("#submit_img");

    // 로그인 후 새로운 페이지로 넘어갈 때 자연스럽게 넘겨주는 함수이다.
    // await page.waitForNavigation();

})();