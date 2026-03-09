<template>
  <div class="guide-unit">
    <div v-if="title || description" class="guide-header">
      <h2 v-if="title" class="guide-title" v-html="title"></h2>
      <p v-if="description" class="guide-desc" v-html="description"></p>
    </div>
    <section class="section">
      <div class="playground">
        <div class="preview-area">
          <div class="preview-box">
            <div><slot :props="state"></slot></div>
          </div>
          <div class="usage-preview">
            <code>{{ generatedCode }}</code>
          </div>
        </div>

        <div class="controls">
          <div v-for="(options, key) in config" :key="key" class="control-item">
            <label>{{ key }}</label>
            <select v-if="Array.isArray(options)" v-model="state[key]">
              <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <label v-else-if="typeof options === 'boolean'" class="checkbox-label">
              <input type="checkbox" v-model="state[key]" /> {{ key }}
            </label>
            <input v-else type="text" v-model="state[key]" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  name: String, // 컴퍼넌트명
  title: String, // 제목
  description: String, // 설명
  config: Object,
  initialState: Object,
})

const state = reactive({ ...props.initialState })

const generatedCode = computed(() => {
  let propsStr = ''
  Object.entries(state).forEach(([key, value]) => {
    if (key === 'slotText') return
    if (typeof value === 'boolean') {
      if (value) propsStr += ` ${key}`
    } else if (value) {
      propsStr += ` ${key}="${value}"`
    }
  })
  return `<${props.name}${propsStr}> ${state.slotText || ''} </${props.name}>`
})
</script>

<style scoped>
.guide-container {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  color: #333;
  white-space: pre-line;
}
.guide-section {
  margin-bottom: 60px;
}
.guide-header {
  margin-bottom: 24px;
}
.guide-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.guide-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}
.playground {
  display: flex;
  gap: 40px;
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
}
.preview-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.preview-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  min-height: 180px;
  border-radius: 8px;
}

.usage-preview {
  background: #282c34;
  color: #9cdcfe;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
}

.controls {
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.control-item label {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
.case-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.case-label {
  font-size: 12px;
  color: #888;
}

.code-wrapper {
  background: #282c34;
  color: #abb2bf;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
}
</style>
