<template>
  <div class="base-table-wrapper">
    <table class="base-table">
      <colgroup>
        <slot name="colgroup"></slot>
      </colgroup>

      <thead>
        <tr>
          <slot name="thead"></slot>
        </tr>
      </thead>

      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.base-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
}
.base-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* colgroup의 넓이를 정확히 적용하기 위해 필수 */
}

/* 스타일은 동일하게 유지 */
:deep(th),
:deep(td) {
  padding: 4px;
  border: 1px solid #e0e0e0;
  text-align: left;
}
:deep(th) {
  background-color: #f8f9fa;
}
:deep(.form-control) {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}
</style>
