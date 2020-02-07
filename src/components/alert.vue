<template>
  <div class="poster" v-if="poster" @click="closeposter">
    <div class="posterImg">
      <figcaption>
        <img :src="img" width="80%" alt="alert" />
      </figcaption>
    </div>
  </div>
</template>
<script>
import alert1 from "../assets/alert1.png";
import alert2 from "../assets/alert2.png";
export default {
  data() {
    return {
      poster: true,
      img: alert1
    };
  },
  methods: {
    closeposter() {
      this.poster = !this.poster;
    },
    getRandom(x) {
      return Math.floor(Math.random() * x) + 1;
    }
  },
  mounted() {
    let i = this.getRandom(2);
    switch (i) {
      case 1:
        this.img = alert1;
        break;
      case 2:
        this.img = alert2;
        break;
    }
  }
};
</script>
<style>
.posterImg {
  height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.posterImg figure {
  font-size: 25px;
}
.poster {
  position: absolute;
  width: 100%;
  height: 110vh;
  background-color: rgba(201, 199, 199, 0.5);
  z-index: 50;
}
</style>