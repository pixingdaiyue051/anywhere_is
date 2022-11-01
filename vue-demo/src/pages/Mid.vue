<template>
  <div>
    <button @click="login">登录</button>
    <button @click="userList">列表</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Mid",
  data() {
    return {
      config: {
        headers: {
          sign: "1001",
        }
      },
    };
  },
  methods: {
    login() {
      this.post("user/login");
    },
    userList() {
      this.post("user/list");
    },
    post(url, params = {}, fnt = (res) => console.log(res)) {
      axios
        .post(`mid/${url}`, params, this.config)
        .then((res) => {
          fnt(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>