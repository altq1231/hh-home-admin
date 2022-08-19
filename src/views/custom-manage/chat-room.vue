<template>
  <div class="chat-room-page">
    <div class="test-ip-address">
      Welcome: <span id="ipAddress">- - - -</span>
    </div>
    <div class="chat-box">
      <div class="left-member flex-col">
        <div class="title" @click="addMessage">用户池</div>
        <ul class="member-ul fill-flex" id="memberUl">
          <li
            class="member-li"
            :class="{ active: selectUser === user.id }"
            v-for="user in userList"
            @click="handleUserSelect(user.id)"
          >
            <img class="avatar" :src="user.avatar" />
            <div class="right-info">
              <p class="nick-name">{{ user.username }}</p>
              <p class="ip-address">{{ user.ipAddress }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="right-chat">
        <div class="chat-bg"></div>
        <header class="header-title">we talk</header>
        <main class="chat-content" ref="mainRef">
          <transition-group name="message-slide">
            <template v-for="message in messageData">
              <div class="message-div" v-if="message.msgType === 'server'">
                <img class="left-avatar" src="/avatar.gif" />
                <div class="right-msg">
                  <div class="top-info">
                    <span>{{ message.username }}</span>
                    <!-- (
                    <span>{{ message.ipAddress }}</span>
                    ) -->
                  </div>
                  <div class="msg-content">
                    {{ message.msg }}
                  </div>
                </div>
              </div>

              <div class="self-message-div" v-else>
                <div class="left-msg">
                  <!-- <div class="top-info">
                    <span>{{ message.username }}</span>
                    (
                    <span>{{ message.ipAddress }}</span>
                    )
                  </div> -->
                  <div class="msg-content">
                    {{ message.msg }}
                  </div>
                </div>
                <img class="right-avatar" src="/avatar.gif" />
              </div>
            </template>
          </transition-group>
        </main>
        <footer class="input-container">
          <div class="tool-tip"></div>
          <a-textarea
            v-model:value="inputVal"
            placeholder="说点什么吧"
            class="top-input"
            @keyup.enter.native="carriageReturn($event)"
          >
          </a-textarea>
          <div class="bottom-btn">
            <a-button
              class="send-btn"
              :disabled="!canSend"
              @click="handleAddMessage"
            >
              发送(Enter)
            </a-button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  onMounted,
  ref,
  unref,
  nextTick,
  toRefs,
  reactive,
  computed,
} from "vue";
import { message } from "ant-design-vue";

const mainRef = ref(null);
const state = reactive({
  userList: [],
  selectUser: null,
  messageData: [],
  inputVal: "",
});
const { userList, selectUser, messageData, inputVal } = toRefs(state);
const canSend = computed(() => {
  return inputVal.value && inputVal.value !== "\n" && inputVal.value.length > 0;
});

const scrollToBottom = () => {
  const tableEl = unref(mainRef);
  nextTick(() => {
    tableEl.scrollTop = tableEl.scrollHeight;
  });
};

const carriageReturn = (event) => {
  event.returnValue = false;
  handleAddMessage();
  return false;
};

const handleUserSelect = (key) => {
  if (key === selectUser.value) {
    selectUser.value = null;
  } else {
    selectUser.value = key;
  }
};

const handleAddMessage = () => {
  console.log(inputVal.value === "");
  if (inputVal.value && inputVal.value !== "\n" && inputVal.value.length > 0) {
    messageData.value.push({
      msgType: "self",
      msg: inputVal.value,
      username: "self",
      ipAddress: "10.8.102.12",
    });
    scrollToBottom();
    inputVal.value = "";
  } else {
    inputVal.value = "";
    message.error("不能发送空消息");
  }
};

const addMessage = () => {
  messageData.value.push({
    msgType: "server",
    msg: "服务器消息",
    username: "admin",
    ipAddress: "10.8.102.12",
  });
  scrollToBottom();
};

onMounted(() => {
  let arrData = [];
  let msgData = [];
  for (let index = 0; index < 20; index++) {
    arrData.push({
      username: `user ${index + 1}`,
      ipAddress: "10.8.102.12",
      avatar: "/avatar.gif",
      id: index,
    });
    msgData.push({
      msgType: index % 2 == 0 ? "server" : "self",
      msg: "这是一段聊天对话，这是一段聊天对话这是一段聊天对话",
      username: index % 2 == 0 ? `user ${index + 1}` : "self",
      ipAddress: "10.8.102.12",
    });
  }
  userList.value = arrData;
  messageData.value = msgData;

  scrollToBottom();
});
</script>

<style lang="less">
.chat-room-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(/chat/page_bg.jpg) top no-repeat;
  background-size: cover;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(#a0aab6, 0.8);
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:decrement {
    border-width: 2px;
    border-color: transparent;
  }

  ::-webkit-scrollbar-thumb:increment {
    border-width: 2px;
    border-color: transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(#a0aab6, 1);
  }

  .test-ip-address {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    line-height: 36px;
    text-align: center;
    position: absolute;
    top: 0;
    right: 20px;
  }

  .chat-box {
    width: 1000px;
    height: 700px;
    display: flex;
    background-color: #fafafa;
    border-radius: 4px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .left-member {
      flex: 0 0 240px;
      width: 240px;
      border-right: 1px solid @border-color-split;

      .title {
        flex: 0 0 60px;
        height: 60px;
        background-color: #fafafa;
        padding: 0 10px;
        font-size: 16px;
        line-height: 60px;
        border-bottom: 1px solid @border-color-split;
      }

      .member-ul {
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;

        .member-li {
          height: 56px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background-color: #e5e5e7;
          }

          &.active {
            background-color: @item-hover-bg;
          }

          &:nth-child(n + 2) {
            &::after {
              content: "";
              display: block;
              position: absolute;
              left: 10px;
              top: 0;
              right: 10px;
              border-top: 1px solid @border-color-split;
            }
          }

          .avatar {
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border-radius: 4px;
          }

          .right-info {
            flex: 1;
            display: flex;
            flex-direction: column;

            .nick-name {
              line-height: 24px;
              color: #000000;
              font-size: 16px;
              font-family: PuHuiSemiBold;
              margin: 0;
            }

            .ip-address {
              line-height: 16px;
              color: #606060;
              font-size: 12px;
              margin: 0;
            }
          }
        }
      }
    }

    .right-chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;

      .chat-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(/chat/chat_bg.jpg) top no-repeat;
        background-size: cover;
        z-index: 1;
      }

      .header-title {
        z-index: 2;
        flex: 0 0 60px;
        height: 60px;
        padding: 10px 30px;
        font-size: 24px;
        color: #000000;
        background-color: #fafafa;
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
      }

      .chat-content {
        z-index: 2;
        flex: 1;
        overflow: auto;
        padding: 0 20px 20px 20px;
        scroll-behavior: smooth;

        .message-div {
          display: flex;
          align-items: flex-start;
          margin-top: 20px;

          .left-avatar {
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-right: 10px;
            margin-top: 14px;
          }

          .right-msg {
            max-width: 80%;
            display: flex;
            flex-direction: column;

            .top-info {
              flex: 0 0 20px;
              height: 20px;
              font-size: 12px;
              color: #606060;
              line-height: 20px;
            }

            .msg-content {
              flex: 1;
              font-size: 14px;
              color: #000000;
              line-height: 20px;
              background-color: #ffffff;
              border-radius: 4px;
              padding: 10px;
              filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
              position: relative;

              &::before {
                content: "";
                position: absolute;
                left: -4px;
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
                background-color: #ffffff;
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 2px;
              }
            }
          }

          &:last-child {
            margin-bottom: 20px;
          }
        }

        .self-message-div {
          z-index: 2;
          display: flex;
          align-items: flex-start;
          margin-top: 20px;
          justify-content: flex-end;

          .right-avatar {
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-left: 10px;
          }

          .left-msg {
            max-width: 80%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .top-info {
              flex: 0 0 20px;
              height: 20px;
              font-size: 12px;
              color: #606060;
              line-height: 20px;
              text-align: right;
            }

            .msg-content {
              flex: 1;
              font-size: 14px;
              color: #000000;
              line-height: 20px;
              background-color: #9eea6a;
              border-radius: 4px;
              padding: 10px;
              filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
              position: relative;

              &::before {
                content: "";
                position: absolute;
                right: -4px;
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
                background-color: #9eea6a;
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 2px;
              }
            }
          }
        }
      }

      .input-container {
        z-index: 2;
        flex: 0 0 140px;
        height: 140px;
        background-color: #ffffff;
        border-top: 1px solid #ececec;
        display: flex;
        flex-direction: column;
        padding: 10px 30px;

        .top-input {
          flex: 1;
          margin-bottom: 5px;
          border: none;
          outline: none;
          font-size: 14px;
          line-height: 20px;
          resize: none;
          outline: none;
          box-shadow: none;
          color: #333333;
        }

        .bottom-btn {
          flex: 0 0 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          .send-btn {
            height: 30px;
            font-size: 14px;
            background-color: #f5f5f5;
            color: #606060;
            outline: none;
            border: 1px solid #e5e5e5;
            cursor: pointer;

            &:hover {
              background-color: #129611;
              color: #ffffff;
            }

            &:disabled {
              opacity: 0.6;
              background-color: #f5f5f5;
              color: #606060;
              cursor: not-allowed;

              &:hover {
                background-color: #f5f5f5;
                color: #606060;
              }
            }
          }
        }
      }
    }
  }
}
</style>
