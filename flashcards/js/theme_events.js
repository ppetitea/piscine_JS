let is_theme_dark = true;

$(".theme").on("click", function() {
  is_theme_dark = !is_theme_dark;
  if (is_theme_dark) {
    document.documentElement.setAttribute("data-theme", "dark");
    $(this).html("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    $(this).html("light");
  }
});
