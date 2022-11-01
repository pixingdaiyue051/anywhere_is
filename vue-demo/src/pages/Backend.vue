<template>
  <div>
    <p>
      <button @click="message">留言</button>
      <button @click="messageUnread">未读留言数</button>
      <button @click="messageUptRead">置为已读</button>
      <button @click="messageAdd">发送留言</button>
    </p>
    <p>
      <button @click="notice">公告</button>
      <button @click="noticeAList">公告</button>
    </p>
    <p>
      <textarea class="text-bg-color" v-model="resData"></textarea>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Backend",
  data() {
    return {
      config: {
        headers: {
          sign: "1001",
        }
      },
      resData: ""
    };
  },
  methods: {
    message() {
      const params = {"studentId": "1770321061069709313", "parentId": "1770280028223037441"};
      this.post("message/list", params);
    },
    messageUnread() {
      const params = {"sender": "1770321061069709313", "recipient": "1770280028223037441"};
      this.post("message/unread", params);
    },
    messageUptRead() {
      const params = {"sender": "1770321061069709313", "recipient": "1770280028223037441"};
      this.post("message/uptRead", params);
    },
    messageAdd() {
      const params = {"type": 1, "sender": "1770321061069709313", "recipient": "1770280028223037441", "content": "ok"};
      this.post("message/add", params);
    },
    notice() {
      const params = {"schoolId": "1750371575276056577"};
      this.post("notice/list", params);
    },
    noticeAList() {
      this.post("admin/notice/list");
    },
    post(url, params = {}, fnt = (res) => console.log(res)) {
      axios
          .post(`backend/${url}`, params, this.config)
          .then((res) => {
            fnt(res.data);
            this.resData = JSON.stringify(res.data, "", "\t");
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
};
</script>

<style scoped>
.text-bg-color {
  height: 500px;
  width: 800px
}
</style>