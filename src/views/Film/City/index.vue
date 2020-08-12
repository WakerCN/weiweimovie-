<template>
  <div class="city_body">
    <BScroller ref="city_scroll">
      <div class="city_list">
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li v-for="city in hotList" :key="city.id" @tap="changeCityTo(city.id,city.nm)">{{city.nm}}</li>
          </ul>
        </div>
        <div class="city_sort" ref="city_sort">
          <div v-for="letterSet in cityList" :key="letterSet.index">
            <h2>{{letterSet.index}}</h2>
            <ul>
              <li v-for="city in letterSet.list" :key="city.id" @tap="changeCityTo(city.id,city.nm)">{{city.nm}}</li>
            </ul>
          </div>
        </div>
      </div>
    </BScroller>
    <div class="city_index">
      <ul>
        <li v-for="(letterSet,index) in cityList" :key="index" @touchstart="jumpTo(index)">
          {{letterSet.index}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'City',

  data () {
    return {
      cityList: [],
      hotList: []
    }
  },

  mounted () {
    var cityList = window.localStorage.getItem('cityList')
    var hotList = window.localStorage.getItem('hotList')
    if (cityList && hotList) { // 本地存在数据
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
    } else { // 本地不存在发起Axios异步请求
      Axios.get('../../data/cities-min.json').then((res) => {
        const letterMap = res.data.letterMap
        const { cityList, hotList } = this.formatCitylist(letterMap)
        this.cityList = cityList
        this.hotList = hotList
        // 将cityList和hotList存储在本地
        window.localStorage.setItem('cityList', JSON.stringify(cityList))
        window.localStorage.setItem('hotList', JSON.stringify(hotList))
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  methods: {
    /** 将城市接口数据转换成需要的数据结构 */
    formatCitylist (oldCityList) {
      const cityList = []
      const hotList = []
      for (var letter in oldCityList) {
        var letterCity = {
          index: letter,
          list: oldCityList.[letter]
        }
        cityList.push(letterCity)
        // 添加热门城市
        for (var city in oldCityList.[letter]) {
          if (oldCityList.[letter][city].isHot === 1) {
            hotList.push(oldCityList.[letter][city])
          }
        }
      }

      return { cityList, hotList }
    },

    /** 索引跳转到对应字母位置 */
    jumpTo (index) {
      var h2s = this.$refs.city_sort.getElementsByTagName('h2')
      this.$refs.city_scroll.jumpToElement(h2s[index])
    },

    /** 点击切换城市 */
    changeCityTo (cityId, cityNm) {
      window.localStorage.setItem('cityNm', cityNm)
      window.localStorage.setItem('cityId', cityId)
      this.$store.commit('city/CITY_INFO', { id: cityId, nm: cityNm })
      this.$router.push('/film/nowplaying')
    }
  }

}
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: hidden;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
