<template>
  <div class="cinema_body">
    <BScroller>
      <ul>
        <li v-for="cinema in cinemaList" :key="cinema.id">
          <div>
            <span>{{cinema.nm}}</span>
            <span class="q" v-if="cinema.sellPrice!=''"><span class="price">{{cinema.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
            <span>{{cinema.addr}}</span>
            <span>{{cinema.distance}}</span>
          </div>
          <div class="card">
            <div>小吃</div>
            <div>折扣卡</div>
          </div>
        </li>
      </ul>
    </BScroller>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'CiList',

  data () {
    return {
      cinemaList: []
    }
  },

  mounted () {
    Axios.get('/ajax/cinemaList?ci=57').then((res) => {
      console.log(res.data.cinemas)
      this.cinemaList = res.data.cinemas
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  display: flex;
}
.cinema_body .address span:nth-of-type(1) {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cinema_body .address span:nth-of-type(2) {
  width: 40px;
  margin-left: 10px;
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
