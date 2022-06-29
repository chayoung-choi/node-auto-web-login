const fs = require('fs');
const dayjs = require("dayjs");
const CommonUtils = {

    /**
     * 현재 시간과의 차이 구하기
     * @param {Date} date 날짜
     * @param {String} type (d, h, m, s, t)
     * @return {int} 차이(0='동일 시간', 양수='미래', 음수='과거')
     */
    getDiffCurrentDate : function (date, type)  {
        const currentTime = (new Date()).getTime();
        const diffTime = date.getTime() - currentTime;
        let result;
        switch (type){
            case 'd':
                result = diffTime / 1000 / 60 / 60 / 24;
                break;
            case 'h':
                result = diffTime / 1000 / 60 / 60;
                break;
            case 'm':
                result = diffTime / 1000 / 60;
                break;
            case 's':
                result = diffTime / 1000;
                break;
            case 't':
            default:
                result = diffTime;
        }
        console.log('parseInt(result)', parseInt(result));
        return parseInt(result);
    },

    /**
     * Min과 Max 사이의 랜덤값
     * @param {int} min
     * @param {int} max
     * @return {int} 랜덤값
     */
    getRandomBetweenMinAndMax : (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    /**
     * 동일한 시간인지 체크
     * @param {int} hour 시간(0~23)
     * @return {boolean} true / false
     */
    isEqualCurrentHourOfDate : function (hour) {
        return dayjs().isSame(dayjs().hour(hour), 'hour')
    },

    /**
     * 실행 가능한 시간인지 체크
     * @param {Array} hoursList 시간(0~23)
     * @param {Date} lastDate 로그 마지막 실행 시간
     * @return {boolean}
     */
    checkRunTime : function (hoursList, lastDate) {
        const currentHours = (new Date()).getHours();
        // 실행 설정 시간이 아닌 경우
        if (!hoursList.includes(currentHours)) {
            console.log("#1 실행 설정 시간이 아닙니다.", currentHours, hoursList);
            return false;
        }

        // 최초 실행인 경우
        if (lastDate == null){
            console.log("#2 최초 실행");
            return true;
        }

        const diffLastDate = this.getDiffCurrentDate(lastDate, 'h');
        // 최근 1시간 이내에 실행 이력 없음
        console.log("diffLastDate", diffLastDate, lastDate);
        if (diffLastDate < -1){
            return true;
        }
        console.log("#3 최근 1시간 이내에 실행되었습니다.");
        return false;
    },

    /**
     * 마지막 실행 시간 가져오기
     * @param {String} filePath 로그 파일 경로
     * @return {Date}
     */
    getLastRunTime : function (filePath) {
        const logFile = fs.readFileSync(filePath, 'utf8');
        const log = logFile.split("\n");

        let data;
        for (let i=log.length-1; i>=0; i--){
            data = log[i].split("|")[0];
            if (data && data.trim() != ""){
                return new Date(data);
                break;
            }
        }
        return null;
    },

}
module.exports = CommonUtils;
