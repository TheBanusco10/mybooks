<script setup lang="ts">
interface Props {
  animation: "float" | "rotate";
}

defineProps<Props>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
    viewBox="-25 -25 250 250"
    class="absolute -z-10"
    :class="[animation]"
  >
    <defs>
      <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" class="start-gradient" />
        <stop offset="100%" class="end-gradient" />
      </linearGradient>
    </defs>
    <path
      d="M109.06055596970089 0.4113142695420464 C68.3280674674956 -1.6412169810522372 -2.6941529348543316 83.99881423711957 3.0177053314645974 124.38102788697333 C7.751572642968699 157.8489523784565 82.24538619382676 201.2561850038526 115.95113135684542 198.7196100500638 C142.94843515299556 196.6878886240003 193.3504364814957 153.2015786609857 196.47710645400915 126.30908455765397 C200.90232165424533 88.24780059596317 147.32967063997168 2.339714833358652 109.06055596970089 0.4113142695420464Z"
      stroke="none"
      fill="url(#lgrad)"
    />
  </svg>
</template>

<style>
.start-gradient {
  stop-color: theme("colors.primary");
  stop-opacity: 0.6;
}

.end-gradient {
  stop-color: theme("colors.secondary");
  stop-opacity: 1;
}

.float {
  animation-name: ani-float;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes ani-float {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, -0px);
  }
}

.rotate {
  animation-name: ani-rotate;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
}

@keyframes ani-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
