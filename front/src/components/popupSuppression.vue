// Le component qui gère la fenêtre popup de suppression oui/non.

<template>
  <div :id="'popup' + id" v-show="show" :class="[show ? 'overlay' : '']">
    <div class="popup">
      <div id="confirmation">{{ question }}</div>
      <div class="content">
        <span class="popupno" @click="$emit('close')">{{ infirmation }}</span>
        <span class="popupyes" @click="action() && $emit('close')">{{
          confirmation
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popupSuppression",
  props: {
    id: {
      type: String,
      default: "1",
    },
    show: {
      type: Boolean,
      default: false,
    },
    question: String,
    infirmation: String,
    confirmation: String,
    action: Function,
  },
};
</script>

<style lang="scss" scoped>
$colormain: #05387a;

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
  & #confirmation {
    margin-top: 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
.popup .content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  & a {
    text-decoration: none;
    cursor: pointer;
    color: $colormain;
  }
  & .popupyes {
    cursor:pointer;
    color: rgb(177, 21, 21);
    margin-top: 2rem;
  }
  & .popupno {
    cursor:pointer;
    color:$colormain;
  }
}
</style>