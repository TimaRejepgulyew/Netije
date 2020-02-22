<template>
  <div class="content-block">
    <footer class="footer">
      <div class="link-items">
        <p class="link">
          <a href="ttDoc.com">TT.Doc</a>
          © 2020
        </p>
        <p class="link">
          Powered By
          <a href="Turkmen-tranzit.com">Turkmen-Tranzit</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";

.footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 24px;
  .link-items {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    a {
      text-decoration: none;

      color: #20a8d8;
      font-family: "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        "Noto Color Emoji";
    }
  }
}
</style>
