<script setup lang="ts">
import { apiCheckLoginStatus } from '@/api/user'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSuccess = ref(false)

const checkLoginStatus = async () => {
  try {
    await apiCheckLoginStatus()
  } catch (error) {
    alert('請重新登入')
    router.push('/login')
  } finally {
    isSuccess.value = true
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <div class="d-flex">
    <Sidebar />

    <div class="main-content d-flex flex-column">
      <Header />
      <RouterView v-if="isSuccess" />
      <div
        v-else
        class="d-flex justify-content-center align-items-center"
        style="height: calc(100vh - 98px)"
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* common */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

.table thead {
  background-color: #e9ecef;
  border-bottom: 2px solid #dee2e6;
}

.table th,
.table td {
  vertical-align: middle;
  padding: 1rem;
}

.table .btn {
  border-radius: 6px;
}

/* 圖片預覽和上傳樣式 */
.image-preview-thumbnail-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 5px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.image-preview-thumbnail-container.main-image {
  box-shadow:
    0 0 0 3px #ffc107,
    0 0 0 6px #ffffff;
}

.image-preview-thumbnail-container.main-image::before {
  content: '主圖';
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 2px 6px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 12px;
  border-top-right-radius: 8px;
  z-index: 10;
}

.image-preview-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  color: #adb5bd;
  font-size: 12px;
}

.image-preview-placeholder i {
  font-size: 24px;
  margin-bottom: 5px;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 20;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
}
</style>
