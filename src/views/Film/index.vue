<template>
  <div id="main">
    <Header title="威威电影"></Header>
    <div id="content">
      <!-- 菜单 begin -->
      <div class="movie_menu">
        <router-link tag="div" to="/film/city" class="city_name">
          <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/film/nowplaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/film/comingsoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/film/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <!-- 菜单 end -->
      <!-- 主容器 begin -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- 主容器 end -->
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Film',

  data () {
    return {
    }
  },

  mounted () {
    var cityNm = window.localStorage.getItem('cityNm')
    var cityId = window.localStorage.getItem('cityId')
    if (cityNm && cityId) {
      this.$store.state.city.nm = cityNm
      this.$store.state.city.id = cityId
    } else {
      Axios.get('../data/cities-min.json').then(res => {
        console.log(res.data.geoCity)
        const curCity = res.data.geoCity
        const letterMap = res.data.letterMap
        const { cityList, hotList } = this.formatCitylist(letterMap)
        window.localStorage.setItem('cityNm', curCity.nm)
        window.localStorage.setItem('cityId', curCity.id)
        window.localStorage.setItem('cityList', JSON.stringify(cityList))
        window.localStorage.setItem('hotList', JSON.stringify(hotList))
      }).catch(err => {
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
    }
  }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>
