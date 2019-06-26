<template>
  <div ref="rightPanel" class="rightPanel-container" :class="{show:show}">
    <div class="rightPanel-background" @click="show=!show"/>
    <div class="rightPanel">
      <div class="handle-button">
        <i :class="show?'el-icon-close':'el-icon-setting'" @click="show=!show"/>
      </div>
      <div class="rightPanel-items">
        <!-- <slot name="other" /> -->
        <div class="tool-list">
          <h3 class="tool-item-title">工具栏</h3>
          <div class="tool-item">
            <span class="item-name">单选框:</span>
            <template>
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolsPanel",
  data() {
    return {
      show: false,
      radio: "1",
      value1:10,
    };
  }
};
</script>

<style scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}
.handle-button {
  width: 40px;
  height: 40px;
  position: absolute;
  left: -64px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 40px;
  top: 250px;
  background-color: rgb(24, 144, 255);
}
.handle-button i {
  font-size: 24px;
  line-height: 40px;
}
.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.show .rightPanel-background {
  z-index: 20000;
  opacity: 1;
  width: 100%;
  height: 100%;
}

.show .rightPanel {
  transform: translate(0);
}

/* 工具 */
.tool-item-title {
  padding: 10px;
  text-align: center;
  font-size: 18px;
  color: #677697;
}
.tool-item {
  border-bottom: 1px solid #e8e8e8;
  padding: 10px;
  overflow: hidden;
}
.tool-item:nth-child() {
  border-bottom: none;
}
.item-name {
  font-size: 16px;
  margin-right: 5px;
}
</style>


