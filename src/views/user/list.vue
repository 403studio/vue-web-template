<template>
  <div>
    <h1>{{ $route.meta.title || 'User list'}}</h1>
    <el-button type="primary">Primary button</el-button>
    <base-test></base-test>
    <base-input></base-input>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
h1 {
  color: $--color-success;
}
</style>
