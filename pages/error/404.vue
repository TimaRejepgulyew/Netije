<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1
          :style="{
            background: textTexture,
            '-webkit-background-clip': 'text'
          }"
        >
          404
        </h1>
      </div>
      <p>Извините страница котурую вы ищите не существует</p>
      <p>Bagyslan sizin gozleyan sahypasy yok.</p>
    </div>
  </div>
</template>

<script>
import textTexture from "~/static/icons/text.png";
export default {
  data() {
    return {
      textTexture: `url(${textTexture})`
    };
  }
};
</script>

<style lang="scss" scoped>
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  text-align: center;
  width: 100%;
  position: relative;
  height: 90vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  padding: 0px 15px;
}

.notfound .notfound-404 {
  position: relative;
  height: 150px;
  line-height: 150px;
  margin-bottom: 25px;
}

.notfound .notfound-404 h1 {
  font-family: "Titillium Web", sans-serif;
  font-size: 186px;
  font-weight: 900;
  margin: 0px;
  background: grey;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  background-position: center;
}

.notfound h2 {
  font-family: "Titillium Web", sans-serif;
  font-size: 26px;
  font-weight: 700;
  margin: 0;
}

.notfound p {
  font-family: "Montserrat", sans-serif;
  font-size: 1vw;
  color: $base-text-color;
  font-weight: 500;
  margin-bottom: 0px;
}

.notfound a {
  font-family: "Titillium Web", sans-serif;

  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  border: none;
  display: flex;
  justify-content: center;
  width: 60%;
  background: darken($base-accent, 1);
  padding: 10px 40px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  margin-top: 15px;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.notfound a:hover {
  opacity: 0.8;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 110px;
    line-height: 110px;
  }
  .notfound .notfound-404 h1 {
    font-size: 120px;
  }
}
</style>