<template>
  <div class="abc">
    <div class="calendar">
      <el-calendar v-model="value"></el-calendar>
      <!-- 回到顶部 -->
      <el-backtop target=".calendar" :bottom="100">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >56</div>
      </el-backtop>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value: new Date()
    };
  },
  mounted() {
    this.getUserIP(ip => {
      this.ip = ip;
    });
    // console.log(205,pc);
  },
  methods: {
    getUserIP(onNewIP) {
      let MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      let pc = new MyPeerConnection({
        iceServers: []
      });
      let noop = () => {};
      let localIPs = {};
      let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
      let iterateIP = ip => {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      };
      pc.createDataChannel("");
      pc.createOffer()
        .then(sdp => {
          sdp.sdp.split("\n").forEach(function(line) {
            if (line.indexOf("candidate") < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch(reason => {});
      pc.onicecandidate = ice => {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
  }
};
</script>

<style scoped>
.calendar {
  width: 500px;
  height: 3000px;
}
</style>
