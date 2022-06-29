# node-auto-web-login
> puppeteer를 이용한 화면 자동 제어 Node.js 프로젝트 

## config.json
```
{
    "site-1": {
        "site": "site 이름",
        "url": "",
        "id": "",
        "pw": "",
        "startHour": 13,
        "endHour": 18
    },
    "site-2": {
        "site": "site 이름2",
        "url": "",
        "id": "",
        "pw": ""
    }
}
```

## 라이브러리
### Puppeteer
**Puppeteer** 는 Headless Chrome 혹은 Chromium 를 제어하도록 도와주는 라이브러리이다.
- Chrome 59 부터 Headless 을 지원한다.
- Puppeteer 는 Node 6 이상 에서 동작하며, Chrome 혹은 Chromium 의 DevTools 프로토콜 을 통해 각 Chrome 혹은 Chromium 의 API 제어한다.