<template>
  <div class="comment">
    <div class="title">
      <span class="text">{{ authorName(comment.User) }} dit : </span>
      <span class="actions" v-if="comment.User.id === user.id || user.admin == true">
        <font-awesome-icon
          class="editpost"
          @click="editComment"
          icon="save"
          v-if="edit"
        />
        <font-awesome-icon
          class="editpost"
          @click="edit = true"
          icon="edit"
          v-else
        />
        <font-awesome-icon
          class="deletepost"
          @click="popup = true"
          icon="trash"
        />
      </span>
    </div>
    <div class="desc">
      <textarea class="comedit" v-if="edit" v-model="comment.text" />
      <div v-else>
        {{ comment.text }}
      </div>
    </div>
    <div class="signature">
      le {{ prettyTime(comment.createdAt) }}
      <span v-if="comment.createdAt != comment.updatedAt"
        >édité à {{ prettyTime(comment.updatedAt) }}</span
      >
    </div>
    <div id="errorpost" v-if="error">{{ error }}</div>
    <popupSuppression
      :id="'comment' + comment.id"
      :question="'Supprimer mon commentaire ?'"
      :infirmation="'Non j\'ai changé d\'avis'"
      :confirmation="'Oui supprimer mon commentaire'"
      :action="trashComment"
      :show="popup"
      @close="popup = false"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import popupSuppression from "@/components/popupSuppression.vue";

export default {
  name: "ViewComment",
  components: {
    popupSuppression,
  },
  data: function () {
    return {
      edit: false,
      error: "",
      popup: false,
    };
  },
  props: {
    comment: Object,
    post: Object,
  },
  methods: {
    ...mapActions(["deleteComment", "updateComment"]),
    editComment() {
      this.error = "";
      this.updateComment(this.comment)
        .then(() => (this.edit = false))
        .catch((e) => {
          this.error = e.response ? e.response.data.message : "oops";
        });
    },
    trashComment() {
      this.deleteComment({ comment: this.comment, post: this.post }).catch(
        (e) => {
          this.error = e.response ? e.response.data.message : "oops";
        }
      );
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["prettyTime"]),
    authorName: () => (user) =>
      user ? user.firstName + " " + user.lastName : "Inconnu",
  },
};
</script>

<style scoped lang="scss">
$colormain: #05387a;
.comment {
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  color: $colormain;
  background: white;

  & .title {
    color: darken($colormain, 10%);
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 0 1vw 0 1vw;
  }
  & .desc {
    justify-content: center;
    text-align: justify;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding: 0 7px 0 7px;
  }
}
.comedit {
  font-size: 1.3rem;
  width: 20rem;
  height: 10rem;
  font-family: "Roboto", Arial;
  border: 2px solid $colormain;
}
</style>