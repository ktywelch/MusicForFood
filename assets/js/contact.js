$(".input").click(function store() {
  e.preventdefault();
  const submit = document.querySelector("submit");
  const inputEmail = document.querySelector("email");
  localStorage.setItem("email", inputEmail.value);
  if (inputEmail.value < 1) {
    $(".alert").html("e mail needed");
  } else {
    console.log(store);
  }
});
