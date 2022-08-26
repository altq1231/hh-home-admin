<template>
  <div class="basic-editor">
    <WangToolbar
      class="editor-toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    >
    </WangToolbar>
    <Editor
      class="editor"
      :defaultConfig="editorConfig"
      mode="default"
      v-model="valueHtml"
      @onChange="handleChange"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar as WangToolbar } from "@wangeditor/editor-for-vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";

const props = defineProps({
  editorValue: {
    default: "",
  },
});

const emits = defineEmits(["update:editorValue"]);
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref(props.editorValue);

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  // console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleChange = (editor) => {
  // console.log("change:", editor.getHtml());

  emits("update:editorValue", editor.getHtml());
};
</script>
<style lang="less">
.basic-editor {
  border: 1px solid @border-color-base;

  .editor-toolbar {
    border-bottom: 1px solid @border-color-base;
  }

  .editor {
    min-height: 600px;
  }

  &.w-e-full-screen-container {
    z-index: 100;
  }

  .w-e-textarea-video-container {
    max-width: 100%;

    video {
      max-width: 100%;
    }
  }
}
</style>
