<template>
  <div class="container">
    <TitleArea>
      <template #breadcrumb>
        <Breadcrumbs />
      </template>
      <template #title>
        <slot name="title">{{ $route.meta.title }}</slot>
      </template>
    </TitleArea>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { TitleArea, Breadcrumbs } from '@/components/common'
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 2em;
}
</style>
