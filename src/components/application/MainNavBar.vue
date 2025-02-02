<template>
  <nav class="navbar navbar-expand-sm bg-butter-cream">
    <div class="container-fluid justify-content-sm-start">
      <RouterLink class="navbar-brand" to="/" title="首頁">
        <span class="lead">肉之家異國料理</span>
      </RouterLink>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 右側覆蓋式導覽列，在sm斷點以下使用 -->
      <div id="offcanvasNavbar" class="offcanvas offcanvas-end bg-body-tertiary" tabindex="-1">

        <div class="offcanvas-header">
          <h5 id="offcanvasNavbarLabel" class="offcanvas-title">網站資訊</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav text-center">
            <li class="nav-item">
              <RouterLink to="/about-us" class="nav-link">關於我們</RouterLink>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                作者資訊
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="https://github.com/JhihKai0531/mock_restaurant-ordering-website" target="_blank">
                    <i class="bi bi-github"></i>
                    GitHub
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>
@media screen and (max-width: 575.98px) {
  .offcanvas {
    max-width: 150px;
  }

  .offcanvas .dropdown-menu {
    --bs-dropdown-min-width: 0;
  }
}
</style>
