<template>
  <div>
<div id="navbarContainer">
  <div id="navbar">
    
    <div id="bubbleWrapper">
      <div id="bubble1" class="bubble"><span class="icon"><i class="fas fa-home"></i>       </span></div>
    </div>
    
    <div id="menuWrapper">
      <div id="menu1" class="menuElement"><van-icon name="question-o" /></div>
      <div id="menu2" class="menuElement"><van-icon name="question-o" /></div>
      <i></i>
      <div id="menu3" class="menuElement"><van-icon name="question-o" /></div>
      <div id="menu4" class="menuElement"><van-icon name="question-o" /></div>
    </div>
    
  </div>
  <div id="bgWrapper">
    <div id="bg"></div>
    <div id="bgBubble"></div>
  </div>
</div>
  <svg width="0" height="0" >
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter"/>
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>
    </defs>
  </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
body {
  background: #37474f;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
}

#navbarContainer {
  width: 100vw;
  min-width: 400px;
  height: 12vh;
  background-color: #ffcc80;
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

#navbar {
  width: 100%;
  height: 60px;
  background-color: #fff;
  position: absolute;
}

#bubbleWrapper {
  position: absolute;
  display: flex;
  justify-content: space-around;
  width: 100%;
  bottom: 25px;
}

.bubble {
  background-color: #fff;
  width: 50px;
  height: 50px;
  bottom: 85px;
  border-radius: 50%;
  z-index: 1;
  transform: translateY(120%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  opacity: 0;
}

#bubble1 {
  transform: translateY(0%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > span {
    opacity: 0.7;
  }
}

#bgWrapper {
  filter: url(#goo);
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 60px;
}
#bg {
  background-color: #ffcc80;
  width: 120%;
  height: 100%;
  margin-left: -10%;
}
#bgBubble {
  position: absolute;
  background-color: #ffcc80;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
}

#menuWrapper {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.menuElement {
  opacity: 0.4;
  transform: translateY(50%);
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
}

#contentWrapper {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    color: #fff;
    font-family: sans-serif;
    font-weight: 400;
  }
}
.content {
  display: none;
  opacity: 0;
}
</style>
