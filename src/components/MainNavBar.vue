<template>
  <nav class="navbar navbar-expand-sm bg-warning-subtle">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/" title="首頁">
        <span class="lead">肉之家</span>
        <span class="fs-6" style="color: rgb(207 160 13);">異國料理</span>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNavbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/about-us" class="nav-link">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact-us" class="nav-link">聯絡我們</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
