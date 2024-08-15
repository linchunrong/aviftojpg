document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const body = document.body;

  function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    mobileMenuOverlay.classList.toggle('hidden');
    body.classList.toggle('overflow-hidden');
  }

  if (menuToggle && mobileMenu && mobileMenuOverlay) {
    menuToggle.addEventListener('click', toggleMenu);

    // 点击菜单外区域关闭菜单
    mobileMenuOverlay.addEventListener('click', toggleMenu);

    // 阻止点击菜单本身时关闭
    mobileMenu.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  } else {
    console.error('Menu elements not found');
  }
});