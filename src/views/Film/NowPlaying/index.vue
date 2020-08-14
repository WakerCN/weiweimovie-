<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading"></Loading>
    <BScroller v-else :pullDownRefresh="refreshFilmList" :pullUpLoad="loadMore">
      <ul>
        <li v-if="isRefreshing" style="height: 20px" ref="refresh">刷新中...</li>
        <li v-for="film in filmList" :key="film.id" @tap="handleToDetail(film.id)">
          <div class="pic_show"><img :src="film.img | ImgUrlFilter_128w_180h"></div>
          <div class="info_list">
            <h2>
              {{film.nm}}
              <span v-if="film.version" class="version"></span>
            </h2>
            <p v-if="film.showst === 3">观众评分 <span class="grade">{{film.sc}}</span></p>
            <p v-if="film.showst === 4"> <span class="grade">{{film.wish}}</span> 人想看</p>
            <p>主演: {{film.star}}</p>
            <p>{{film.showInfo}}</p>
          </div>
          <div :class="film.showst | btnType">
            购票
          </div>
        </li>
      </ul>
    </BScroller>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'NowPlaying',

  data () {
    return {
      preCity: -1,
      isLoading: true,
      isRefreshing: false,
      curLoadPage: 1,
      filmList: []
    }
  },

  filters: {
    btnType (showst) {
      return (showst === 3) ? 'btn_mall' : 'btn_pre'
    }
  },

  activated () {
    this.isLoading = true
    const curCityId = this.$store.state.city.id
    if (curCityId === this.preCity) {
      this.isLoading = false
      return
    }
    Axios.get(`/ajax/movieOnInfoList?ci=${curCityId}`).then((res) => {
      if (res.statusText === 'OK') {
        this.filmList = res.data.movieList
        this.isLoading = false
        this.preCity = curCityId
      }
    }).catch((err) => {
      console.log(err)
    })
  },

  methods: {
    /** 刷新电影列表 */
    refreshFilmList () {
      this.isRefreshing = true
      Axios.get(`/ajax/movieOnInfoList?ci=${this.preCity}`).then((res) => {
        if (res.statusText === 'OK') {
          this.filmList = res.data.movieList
          this.$refs.refresh.innerHTML = '刷新成功'
          setTimeout(() => {
            this.isRefreshing = false
          }, 2000)
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /** 加载更多电影列表 */
    loadMore () {
      console.log('加载更多' + this.curLoadPage)
    },

    /** 跳转到详情页 */
    handleToDetail (filmId) {
      this.$router.push(`/detail/${filmId}`)
    }
  }

}
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: hidden;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.version {
  background-size: contain;
  background-repeat: no-repeat;
  height: 14px;
  width: 43px;
  display: inline-block;
  margin-top: 5px;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  margin-right: 3px;
  background-image: url("../../../assets/maxs.png");
}
</style>
