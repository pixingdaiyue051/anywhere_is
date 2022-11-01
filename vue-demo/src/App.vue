<template>
  <div>
    <p>
      <span>测试接口mid</span>
      <router-link to="/mid">Mid</router-link>
    </p>
    <p>
      <span>测试接口backend</span>
      <router-link to="/backend">Backend</router-link>
    </p>
    <p>
      <span>测试接口boot</span>
      <router-link to="/boot">Boot</router-link>
    </p>
    <p>
      <span>测试websocket</span>
      <router-link to="/home">Home</router-link>
    </p>
    <p>
      <span>测试webrtc</span>
      <router-link to="/rtc">Rtc</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log("App mounted", this);
    console.log("this.$router", this.$router);
    console.log("this.$store", this.$store);
  },
};
</script>