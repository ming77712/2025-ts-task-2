<script setup lang="ts">
// TODO: 匯入 API 函式
// 提示：從 @/api/products 匯入 apiCreateProduct, apiEditProduct
import { apiCreateCoupon, apiEditCoupon } from '@/api/coupon'
import { useCouponForm } from '@/composable/useCouponData'

// TODO: 匯入型別定義
// 提示：從 @/types/product 匯入 ProductData
import type { CouponData } from '@/types/coupon'
import { Modal } from 'bootstrap'

import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

import Datepicker from 'vue3-datepicker'

// TODO: 定義 Props 介面
// 提示：ProductModalProps 應該包含 product 屬性，型別是 ProductData
interface CouponModalProps {
  coupon: CouponData
}

// TODO: 定義 props
// 提示：使用 defineProps<ProductModalProps>()
const { coupon } = defineProps<CouponModalProps>()

const emit = defineEmits(['get-coupons'])

// TODO: 為模板引用加上型別註解
// 提示：使用 useTemplateRef<HTMLElement>()
const modalRef = useTemplateRef<HTMLElement>('modalRef')

// TODO: 為 modal 變數加上型別註解
// 提示：型別是 Modal | null
let modal: Modal | null = null

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
})

onUnmounted(() => {
  if (modal) {
    modal.dispose()
  }
})

const openModal = () => {
  if (modal) {
    modal.show()
  }
}

const closeModal = () => {
  if (modal) {
    modal.hide()
  }
}

const { form, formTitle, loadCoupon } = useCouponForm()

watch(
  () => coupon,
  (newCoupon) => {
    if (newCoupon.id) {
      loadCoupon(newCoupon)
    } else {
      loadCoupon(null)
    }
  },
  { immediate: true, deep: true },
)

const isEditMode = computed(() => Boolean(coupon.id))

const isLoading = ref(false)

const selectedDate = ref<Date | null>(null)

// 秒 timestamp
const timestamp = computed(() =>
  selectedDate.value ? Math.floor(selectedDate.value.getTime() / 1000) : null,
)

const saveCoupon = async () => {
  const { id, ...couponData } = form.value
  console.log('timestamp', timestamp.value)
  const data = {
    ...couponData,
    due_date: timestamp.value,
  }
  console.log('data', data)

  isLoading.value = true

  try {
    if (isEditMode.value && id) {
      await apiEditCoupon({ data, id })
    } else {
      await apiCreateCoupon(data)
    }
    closeModal()
  } catch (error) {
    alert('新增/編輯優惠券失敗')
  } finally {
    isLoading.value = false
    emit('get-coupons')
  }
}

defineExpose({
  openModal,
  closeModal,
})
</script>

<template>
  <div
    ref="modalRef"
    class="modal fade"
    id="addNewCouponModal"
    tabindex="-1"
    aria-labelledby="addNewCouponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewCouponModalLabel">{{ formTitle }}</h5>
          <button
            @click="closeModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <form>
                <div class="mb-3">
                  <label for="couponName" class="form-label">優惠券名稱</label>
                  <input
                    v-model="form.title"
                    type="text"
                    class="form-control rounded-lg"
                    id="couponName"
                  />
                </div>
                <div class="row">
                  <div class="col-6 mb-3">
                    <label for="couponPercent" class="form-label">折數</label>
                    <input
                      v-model="form.percent"
                      type="number"
                      class="form-control rounded-lg"
                      id="couponPercent"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="couponCode" class="form-label">折扣碼</label>
                    <input
                      v-model="form.code"
                      type="text"
                      class="form-control rounded-lg"
                      id="couponCode"
                    />
                  </div>
                </div>
                <div class="mb-3 d-flex align-items-center">
                  <label for="flexSwitchCouponEnable" class="form-label me-3 mb-0">啟用</label>
                  <div class="form-check form-switch">
                    <input
                      v-model="form.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCouponEnable"
                      :true-value="1"
                      :false-value="0"
                    />
                  </div>
                </div>
                <label for="couponDate" class="form-label">優惠券有效日期</label>
                <Datepicker id="couponDate" v-model="selectedDate" />
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-outline-secondary rounded-lg">
            取消
          </button>
          <button
            @click="saveCoupon"
            :disabled="isLoading"
            type="button"
            class="btn btn-dark rounded-lg"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
