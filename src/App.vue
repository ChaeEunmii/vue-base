<script setup>
import { RouterView } from 'vue-router'
import { useAlertProvider } from '@/hooks/useAlert'
import { AlertDialog } from '@/components/common'

// showAlert 기능을 하위 컴포넌트들에 전파(provide)
const { alerts, removeAlert } = useAlertProvider()
</script>

<template>
  <RouterView />
  <AlertDialog
    v-for="(item, index) in alerts"
    :key="index"
    :title="item.title"
    :message="item.message"
    :labelProps="item.labelProps"
    :showCancel="item.showCancel"
    :onConfirm="
      () => {
        if (item.onConfirm && typeof item.onConfirm === 'function') {
          item.onConfirm()
        }
        removeAlert()
      }
    "
    :onCancel="item.showCancel ? removeAlert : undefined"
  />
</template>
