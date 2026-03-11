<template>
  <SearchBox @search="doSearch">
    <FormGroup label="이메일 주소" v-slot="{ id }" required :error="emailError" class="grid-1">
      <Input
        :id="id"
        v-model="email"
        type="email"
        placeholder="example@mail.com"
        :error="!!emailError"
      />
    </FormGroup>
    <FormGroup id="my-custom-id" label="이름">
      <Input id="my-custom-id" v-model="userName" />
    </FormGroup>
    <FormGroup id="my-custom-id" label="이름">
      <Input id="my-custom-id" v-model="userName" />
    </FormGroup>
    <div class="grid-=1">야호</div>
    <FormGroup id="my-custom-id" label="이름" class="grid-1">
      <Input id="my-custom-id" v-model="userName" />
    </FormGroup>
    <FormGroup id="my-custom-id" label="이름" class="grid-3">
      <Input id="my-custom-id" v-model="userName" />
    </FormGroup>
    <FormGroup id="my-custom-id" label="이름" class="grid-3">
      <Input id="my-custom-id" v-model="userName" />
    </FormGroup>
    <FormGroup id="my-custom-id" label="이름" class="grid-3">
      <Input id="my-custom-id" v-model="userName" />
    </FormGroup>
  </SearchBox>
</template>
<script setup>
import { ref } from 'vue'
import { SearchBox, FormGroup, Input } from '@/components/common'

const userName = ref('')
const email = ref('')
const emailError = ref('')

// 검색 이벤트
const doSearch = () => {
  console.log('검색!!')
}
</script>
<style lang="scss" scoped></style>
