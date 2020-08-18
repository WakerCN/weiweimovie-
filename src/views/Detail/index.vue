<template>
  <div id="detailContainer">
    <Header title="影院详情">
      <i class="iconfont icon-right" @touchstart="backToFilm"></i>
    </Header>
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="filmInfo.img | ImgUrlFilter_128w_180h">
          </div>
          <div class="detail_list_info">
            <h2>{{filmInfo.nm}}</h2>
            <p>{{filmInfo.enm}}</p>
            <p>{{filmInfo.sc}}</p>
            <p>{{filmInfo.cat}}</p>
            <p>{{filmInfo.src}} / {{filmInfo.dur}}分钟</p>
            <p>{{filmInfo.pubDesc}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{filmInfo.dra}}
        </p>
      </div>
      <!-- <Swiper slidesPerView="3">
        <div class="swiper-slide" v-for="(photo,index) in photos" :key="index">
          <img src="/images/person_1.webp">
        </div>
      </Swiper> -->
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
// import Swiper from './DetailSwiper'

export default {
  name: 'Detail',

  data () {
    return {
      filmId: this.$route.params.filmId,
      filmInfo: {},
      photos: []
    }
  },

  components: {
    // Swiper
  },

  mounted () {
    Axios.get(`/ajax/detailmovie?movieId=${this.filmId}`).then(res => {
      this.filmInfo = res.data.detailMovie
    }).catch(err => {
      console.log(err)
    })
  },

  methods: {
    backToFilm () {
      this.$router.push('film/nowplaying')
    }
  }
}
</script>

<style scoped>
#detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}

#detailContainer .contentDetail {
  display: block;
  margin-bottom: 0;
}
#detailContainer .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}

.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}

#content .detail_intro {
  padding: 10px;
}

#content .swiper-container {
  width: 100%;
}

#content .swiper-container img {
  width: 100%;
}
</style>
