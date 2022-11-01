<template>
  <div>
    <video
      ref="_camera1901"
      autoplay
      controls
      width="300px"
      height="300px"
    ></video>
    <p>
      <button class="inp-bg-color" @click="openCamera">打开摄像头</button>
      <button class="inp-bg-color" @click="closeCamera">关闭摄像头</button>
    </p>
    <audio ref="_audio1901" autoplay controls></audio>
    <p>
      <button class="inp-bg-color" @click="openAudio">打开麦克风</button>
      <button class="inp-bg-color" @click="closeAudio">关闭麦克风</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Rtc",
  data() {
    return {};
  },
  methods: {
    openCamera() {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          console.log(stream);
          this.$set(this.$refs._camera1901, "srcObject", stream);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeCamera() {},
    openAudio() {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((stream) => {
          console.log(stream);
          this.$set(this.$refs._audio1901, "srcObject", stream);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeAudio() {},
  },
};
</script>