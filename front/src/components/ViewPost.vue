<template>
  <div class="viewpost">
    <div class="getposts">
      <div class="post">
        <div class="title">
          <span class="text">{{ post.title }}</span>
          <span class="actions" v-if="post.UserId === user.id || user.admin == true">
            <router-link :to="'/post/' + post.id + '/edit'">
              <font-awesome-icon class="editpost" icon="edit" />
            </router-link>
            <font-awesome-icon
              class="deletepost"
              @click="popup = true"
              icon="trash"
            />
          </span>
        </div>
        <img
          class="imagepost"
          v-if="post.imageUrl"
          :src="getImageUrl(post.imageUrl)"
        />
        <div class="desc">
          {{ post.description }}
        </div>
        <div class="signature">
          Crée par {{ authorName(post.User) }} le
          {{ prettyTime(post.createdAt) }}
        </div>
      </div>
    </div>
      <form name="form" id="form" novalidate>
        <span id="errorcom" v-if="error">{{ error }}</span>
        <div class="form">
          <label>Votre commentaire</label>
          <textarea class="commentaire" v-model="comment" placeholder="Votre commentaire" name="commentaire" required: true/>
        </div>

        <div class="submit">
          <button type="button" id="submit" @click="postComment">
            Commenter
          </button>
        </div>
      </form>
    <div v-for="com in post.Coms" :key="com.id">
      <ViewComment id="coms" :comment="com" :post="post" />
    </div>
    <popupSuppression
      :question="'Supprimer mon Post ?'"
      :show="popup"
      :infirmation="'Non j\'ai changé d\'avis'"
      :confirmation="'Supprimer mon post'"
      :action="() => deletePost(post)"
      @close="popup = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import popupSuppression from "@/components/popupSuppression.vue";
import ViewComment from "@/components/ViewComment.vue";

export default {
  name: "ViewPost",
  components: {
    popupSuppression,
    ViewComment,
  },
  props: {
    post: Object,
  },
  data: function () {
    return {
      comment: "",
      error: "",
      popup: false,
    };
  },
  methods: {
    ...mapActions(["deletePost", "createComment", "fetchPost"]),
    postComment: function () {
      if (this.comment != "") {
        this.createComment({ text: this.comment, PostId: this.post.id })
          .then(() => this.fetchPost(this.post.id))
          .catch((e) => {
            this.error = e.response ? e.response.data.message : "oops";
          });
      } else {
        this.error = "Pas de commentaire vide !";
      }
    },
  },
  computed: {
    ...mapGetters(["getImageUrl", "prettyTime"]),
    ...mapState(["user"]),
    authorName: () => (user) =>
      user ? user.firstName + " " + user.lastName : "Inconnu",
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

.getposts {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .post {
    border: 3px solid $colormain;
    margin-bottom: 2rem;
    color: $colormain;
    background: white;
    width: 40rem;
    & a {
      text-decoration: none !important;
      color: #05387a;
    }
    & .imagepost {
      border: 3px solid $colormain;
    }
    & .title {
      color: darken($colormain, 10%);
      font-size: 2.5rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
      padding: 0 7px 0 7px;
      display: flex;
      flex-direction: column;
      text-decoration: underline;
      & .text {
        margin-bottom: 1rem;
      }
    }
    & .desc {
      margin-top: 1rem;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-align: justify;
      padding: 0 7px 0 7px;
    }
  }
}
.form {
  .commentaire {
    font-size: 1.3rem;
    width: 20rem;
    height: 10rem;
    font-family: "Roboto", Arial;
    border: 2px solid $colormain;
    &:focus {
      outline: none;
    }
  }
}
.editpost {
  cursor: pointer;
  color: $colormain;
  margin: 0 1rem 0 1rem;
}

.deletepost {
  cursor: pointer;
  color: rgb(177, 21, 21);
  margin: 0 1rem 0 1rem;
}

#coms {
  border: 2px solid $colormain;
}

#errorcom {
  color: rgb(177, 21, 21);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .getposts {
    flex-direction:row;
    .post {
      width: 100%;
    }
  }
}
</style>