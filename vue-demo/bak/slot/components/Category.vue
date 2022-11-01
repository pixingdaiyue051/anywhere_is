<template>
  <div class="category">
    <CateItem title="美食">
      <img src="/data/pic/109951164088049102.jpg" />
    </CateItem>
    <CateItem title="电影">
      <video slot="s1" controls src="/data/vod/145363656316362335.mp4" />
      <template slot-scope="zsobj">
        <a
          href="javascript:void(0);"
          v-for="(item, idx) in zsobj.arr"
          :key="idx"
          >{{ item }}</a
        >
      </template>
    </CateItem>
    <CateItem title="游戏">
      <!-- 使用template标签最终不会出现在dom上 -->
      <!-- 具名插槽可以使用v-slot:s1 或者 slot="s1" -->
      <template v-slot:s1>
        <ul>
          <li v-for="(g, idx) in games" :key="idx">{{ g }}</li>
        </ul>
      </template>
      <!-- 作用域插槽可以使用slot-scope="zsobj" 或者 scope="zsobj" 如果只有一个数据可以使用slot-scope="{arr}" -->
      <template slot-scope="zsobj">
        <h4 v-for="(item, idx) in zsobj.arr" :key="idx">{{ item }}</h4>
      </template>
      <!-- <template slot-scope="{arr}">
        <h4 v-for="(item, idx) in arr" :key="idx">{{ item }}</h4>
      </template> -->
    </CateItem>
  </div>
</template>

<script>
import CateItem from "./CateItem";

export default {
  name: "Category",
  data() {
    return {
      foods: ["烧烤", "火锅", "海鲜", "自助", "烤羊"],
      films: ["千星之城", "第五元素", "碧海蓝天", "地下铁", "安娜"],
      games: ["堡垒之夜", "霓虹深渊", "糖豆人", "战地", "雀魂"],
    };
  },
  components: {
    CateItem,
  },
};
</script>

<style scoped>
.category {
  display: flex;
  justify-content: space-around;
}
</style>