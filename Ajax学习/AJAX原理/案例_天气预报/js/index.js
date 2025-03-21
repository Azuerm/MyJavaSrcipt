/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
function getWeather(cityCode) {
    // 1 获得北京天气数据
    myAxios({
        url:'http://hmajax.itheima.net/api/weather',
        params: {
            city: cityCode
        }
    }).then(result => {
        console.log(result)
        const wObj = result.data
        // 1.2 数据展示到页面
        document.querySelector('.title').innerHTML = ` <span class="dateShort">${wObj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
        </span>`
        document.querySelector('.area').innerHTML = wObj.area

        document.querySelector('.weather-box').innerHTML = `
                <div class="tem-box">
                    <span class="temp">
                    <span class="temperature">${wObj.temperature}</span>
                    <span>°</span>
                    </span>
                </div>
                <div class="climate-box">
                    <div class="air">
                    <span class="psPm25">${wObj.psPm25}</span>
                    <span class="psPm25Level">${wObj.psPm25Level}</span>
                    </div>
                    <ul class="weather-list">
                    <li>
                        <img src="${wObj.weatherImg} " class="weatherImg" alt="">
                        <span class="weather">${wObj.weather}</span>
                    </li>
                    <li class="windDirection">${wObj.windDirection}</li>
                    <li class="windPower">${wObj.windPower}</li>
                    </ul>
                </div>
            `
        
              // 当天天气
    const twObj = wObj.todayWeather
    const todayWStr = `<div class="range-box">
    <span>今天：</span>
    <span class="range">
      <span class="weather">${twObj.weather}</span>
      <span class="temNight">${twObj.temNight}</span>
      <span>-</span>
      <span class="temDay">${twObj.temDay}</span>
      <span>℃</span>
    </span>
  </div>
  <ul class="sun-list">
    <li>
      <span>紫外线</span>
      <span class="ultraviolet">${twObj.ultraviolet}</span>
    </li>
    <li>
      <span>湿度</span>
      <span class="humidity">${twObj.humidity}</span>%
    </li>
    <li>
      <span>日出</span>
      <span class="sunriseTime">${twObj.sunriseTime}</span>
    </li>
    <li>
      <span>日落</span>
      <span class="sunsetTime">${twObj.sunsetTime}</span>
    </li>
  </ul>`
    document.querySelector('.today-weather').innerHTML = todayWStr
        
    // 7日天气预报数据展示
    const dayForecast = wObj.dayForecast
    const dayForecastStr = dayForecast.map(item => {
      return `<li class="item">
      <div class="date-box">
        <span class="dateFormat">${item.dateFormat}</span>
        <span class="date">${item.date}</span>
      </div>
      <img src="${item.weatherImg}" alt="" class="weatherImg">
      <span class="weather">${item.weather}</span>
      <div class="temp">
        <span class="temNight">${item.temNight}</span>-
        <span class="temDay">${item.temDay}</span>
        <span>℃</span>
      </div>
      <div class="wind">
        <span class="windDirection">${item.windDirection}</span>
        <span class="windPower">${item.windPower}</span>
      </div>
    </li>`
    }).join('')
    // console.log(dayForecastStr)
    document.querySelector('.week-wrap').innerHTML = dayForecastStr
    }).catch( error => {
        console.log(error)
        
    })
}
getWeather('110100')

//  搜索城市列表
    document.querySelector('.search-city').addEventListener('input', e => {
        myAxios({
            url:'http://hmajax.itheima.net/api/weather/city',
            parmas: {
                city: e.target.value
            }
        }).then( result => {
            console.log(result)
            const list = result.data.map( item => {
                return `<li class="city-item" data-code="${item.code}">${item}</li>`
            }).join('')
            console.log(list)
            document.querySelector('.search-list').innerHTML = list
        }).catch( error => {
            console.log(error)
            
        })
        
    })
// 切换城市
    document.querySelector('.search-list').addEventListener('click', e => {
        // 有没有包含某个类classList.contains
        if (e.target.classList.contains('city-item')) {
            const cityCode = e.target.dataset.code
            getWeather(cityCode)
        }
    })