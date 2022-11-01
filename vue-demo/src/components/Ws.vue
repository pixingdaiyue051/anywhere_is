<template>
  <div class="container">
    <input class="inp-bg-color" v-model="iptText" />
    <button class="inp-bg-color" @click="handlerSend">发送</button>
    <br />
    <input
      class="inp-bg-color"
      type="file"
      multiple="multiple"
      @change="changeFile"
    />
    <button class="inp-bg-color" @click="sendFile">发送</button>
    <ul v-for="item in fileList" :key="item.id">
      <li>
        {{ item.filename }}<button @click="deleteFile(item.id)">-</button>
      </li>
    </ul>
    <br />
    <span>{{ spanText }}</span>
  </div>
</template>

<script>
import WsConst from "../scripts/ws_const";
import { nanoid } from "nanoid";

export default {
  name: "Ws",
  data() {
    return {
      iptText: "",
      spanText: "",
      fileList: [],
    };
  },
  methods: {
    conn() {
      this.ws = new WebSocket(WsConst.WS_URL);
      // 连接关闭函数
      this.ws.onclose = () => {
        console.log("连接已关闭...");
        clearTimeout(this.tt);
        if (++this.limit > WsConst.MAX_CON_LIMIT) {
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
        // 开启心跳包
        this.heartBeat();
      };
      // 业务订阅成功后接受服务端推送消息 其实是个字符串
      this.ws.onmessage = (evt) => {
        const res = evt.data;
        console.log("接收到消息...", res);
        const json = JSON.parse(res);
        this.spanText = json.msg;
      };
    },
    heartBeat() {
      this.tt = setTimeout(() => {
        this.ws.send(WsConst.MSG_HEART);
        this.heartBeat();
      }, WsConst.HEART_BEAT_FREQ);
    },
    handlerSend() {
      if (!this.iptText) {
        return;
      }
      const message = {
        code: "2002",
        msg: this.iptText,
      };
      this.ws.send(JSON.stringify(message));
      this.iptText = "";
    },
    changeFile(e) {
      const files = e.target.files;
      if (!files || !files.length) {
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // if ("image/jpeg" != file.type && "image/png" != file.type) {
        //   continue;
        // }
        // if (file.size > 33554432) {
        //   continue;
        // }
        const filename = file.name;
        const fileSuffix = filename.substring(filename.lastIndexOf("."));
        this.fileList.push({
          id: nanoid(),
          file,
          filename,
          fileSuffix,
        });
      }
    },
    sendFile() {
      if (!this.fileList.length) {
        return;
      }
      this.fileList.forEach((item) => {
        const d = {
          code: "3000",
          msg: item.filename,
          key: item.fileSuffix,
        };
        this.ws.send(JSON.stringify(d));
        this.ws.send(item.file);
      });
      this.fileList = [];
    },
    deleteFile(id) {
      this.fileList = this.fileList.filter((val) => val.id !== id);
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