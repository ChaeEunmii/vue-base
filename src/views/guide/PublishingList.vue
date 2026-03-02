<template>
  <div class="about">
    <h1>퍼블목록</h1>
    <RouterLink to="/">Main</RouterLink>
    <RouterLink to="/guide">Component Guide</RouterLink>
    <RouterLink to="/guide/publishing">Publishing List</RouterLink>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
