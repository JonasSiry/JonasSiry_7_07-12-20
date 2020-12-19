<template>
  <div class="postid">
    <div id="postid">
      <img id="image" />
      <div id="title"></div>
      <div id="description"></div>
      <div id="commentaires"></div>
    </div>
    <div id="leavecom">
      <label>Laisser un commentaire</label>
      <textarea id="coms" value="" placeholder="Laisser un commentaire"
      name="Commentaire" required: true/>
    </div>
    <div class="submit">
      <button type="submit" id="submit">Poster</button>
    </div>
  </div>
</template>

<script></script>

<style lang="scss">
$colormain: #05387a;
#postid {
  display: flex;
  flex-direction: column;
  border: 3px solid $colormain;
  & #image {
    height: 30rem;
    width: auto;
  }
  & #title {
    font-size: 2rem;
  }
  & #description {
    font-size: 1.5rem;
  }
  & #commentaires {
    font-size: 1.5rem;
  }
}
#leavecom {
  & #coms {
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
</style>