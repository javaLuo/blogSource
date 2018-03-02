<template>
    <div class="header">
        <ul>
            <li>LOGIN</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 16px;
  color: #f0f0f0;
  z-index: 3;
  font-size: 14px;
  letter-spacing: 1px;
  & > ul {
    display: flex;
    & > li {
      padding: 0 8px;
      position: relative;
      & + li {
        &::before {
          content: "";
          width: 1px;
          position: absolute;
          left: 0;
          top: 5px;
          height: 8px;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
