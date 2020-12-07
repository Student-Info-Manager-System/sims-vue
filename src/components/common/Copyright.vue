<template>
  <div>
    <p>Copyrights © 2020-{{ now }} SuperLONG. 版权所有.</p>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    var copyright = new Date()
    var update = copyright.getFullYear()
    return {
      now: update
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 1.4rem;
    margin: auto;
    color: #FFF;
    position: fixed; bottom: 0;
    left:50%;transform:translate(-50%,0%);
  }
</style>