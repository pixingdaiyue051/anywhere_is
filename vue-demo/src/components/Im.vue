<template>
  <div class="container">
    <ImLeft />
    <ImRight :role="role" />
    <ImBottom :role="role" />
  </div>
</template>

<script>
import ImLeft from "./ImLeft";
import ImRight from "./ImRight";
import ImBottom from "./ImBottom";
import WsConst from "../scripts/ws_const";

export default {
  name: "Im",
  components: {
    ImLeft,
    ImRight,
    ImBottom,
  },
  props: ["role", "serviceId", "userId"],
  data() {
    return {
      limit: 0,
    };
  },
  computed: {
    ended() {
      return this.$store.state[this.role].ended;
    },
  },
  methods: {
    conn() {
      this.ws = new WebSocket(WsConst.WS_URL);
      // 连接关闭函数
      this.ws.onclose = () => {
        console.log("连接已关闭...");
        clearTimeout(this.tt);
        if (this.ended || ++this.limit > WsConst.MAX_CON_LIMIT) {
          return;
        }
        setTimeout(() => this.conn(), WsConst.RECON_FREQ);
      };
      // 连接错误函数
      this.ws.onerror = () => {
        console.log("连接错误...");
      };
      // 连接建立 发送信息
      this.ws.onopen = () => {
        console.log("已连接...");
        this.limit = 0;
        if (this.serviceId) {
          this.$store.commit("service/openWs", {
            ws: this.ws,
            serviceId: this.serviceId,
          });
        } else if (this.userId) {
          this.$store.commit("user/openWs", {
            ws: this.ws,
            userId: this.userId,
          });
        } else {
          console.log("暂不支持的操作");
        }
        // this.$store.commit(`${this.role}/openWs`, json);
        // 开启心跳包
        this.heartBeat();
      };
      // 业务订阅成功后接受服务端推送消息 其实是个字符串
      this.ws.onmessage = (evt) => {
        const res = evt.data;
        console.log("接收到消息...", res);
        const json = JSON.parse(res);
        if (json.code === "2000") {
          return;
        }
        this.$store.commit(`${this.role}/messageCallback`, json);
      };
    },
    heartBeat() {
      this.tt = setTimeout(() => {
        this.ws.send(WsConst.MSG_HEART);
        this.heartBeat();
      }, WsConst.HEART_BEAT_FREQ);
    },
  },
  mounted() {
    if ("WebSocket" in window) {
      console.log("支持WebSocket");
      // 启动连接ws
      this.conn();
    } else {
      console.alert("该浏览器不支持WebSocket");
    }
  },
};
</script>

<style scoped>
.container {
  border: 2px solid #000;
  width: 1000px;
  /* 1004 */
  height: 800px;
  /* 804 */
}
</style>