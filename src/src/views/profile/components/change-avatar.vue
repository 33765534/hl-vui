<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button
      class="mt-4 w-[80%] xl:h-1/2"
      @click="onConfirmClick"
      :loading="loading"
    >
      确定
    </m-button>
  </div>
</template>
<script>
const EMITS_CLOSE = "close";
// pc 端配置对象
const pcOptions = {
  // 剪裁框定纵横比：1：1
  aspectRatio: 1,
};

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: "move",
  // 裁剪框固定纵横比：1：1
  aspectRatio: 1,
  // 剪裁框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false,
};
</script>
<script setup>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { onMounted, ref } from "vue";
import { isMobileTerminal } from "@/utils/flexible";
import { getOSSClient } from "@/utils/sts";
import { useStore } from "vuex";
import { message } from "@/libs";
import { putProfile } from "@/api/sys";

const store = useStore();
defineProps({
  blob: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(EMITS_CLOSE);
/**
 * 确定按钮点击事件
 */
const loading = ref(false);
const onConfirmClick = () => {
  loading.value = true;
  // 拿到剪裁后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的blob地址
    // URL.createObjectURL(blob);
    putObjectToOSS(blob);
  });
};
let ossClient;
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient();
  }
  try {
    const fileTypeArr = file.type.split("/");
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`;
    // 1.存放的路径（包含名称）
    // 2.file
    const res = await ossClient.put(`images/${fileName}`, file);
    onChangeProfile(res.url);
  } catch (e) {
    message("error", e);
  }
};

/**
 * 上传新头像到服务器
 */
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit("user/setUserInfo", {
    ...store.getters.userInfo,
    avatar,
  });

  // 更新服务器数据
  await putProfile(store.getters.userInfo);
  message("success", "用户头像修改成功");
  loading.value = false;
  close();
};
/**
 * 关闭按钮点击事件
 */
const close = () => {
  emits(EMITS_CLOSE);
};
/**
 * 图片裁剪
 */
const imageTarget = ref(null);
let cropper;
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  );
});
</script>
