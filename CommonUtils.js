const CommonUtils = {
    /**
     * 현재 시간과의 차이 구하기
     * @param {int} hours 시간(0~23)
     * @return {int} 차이(0='동일 시간', 양수='미래', 음수='과거'
     */
    getDiffCurrentHoursOfDate : function (hours)  {
        const currentHours = (new Date()).getHours();
        return hours - currentHours;
    },

    /**
     * Min과 Max 사이의 랜덤값
     * @param {int} min
     * @param {int} max
     * @return {int} 랜덤값
     */
    getRandomBetweenMaxAndMin : (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    /**
     * 동일한 시간인지 체크
     * @param {int} hours 시간(0~23)
     * @return {boolean} true / false
     */
    isEqualCurrentHoursOfDate : function (hours) {
        return this.getDiffCurrentHoursOfDate(hours) === 0 ? true : false;
    }




}
module.exports = CommonUtils;