//*Create EventListeners and call assync functions to display Accueil content and  menu contents:
document.addEventListener("DOMContentLoaded", () => {
  let urlPath = `/Accueil`;
  fetch(urlPath)
    .then(function (reponse) {
      return reponse.text();
    })
    .then(function (html) {
      let wrap = document.getElementById("content-wrap");
      wrap.innerHTML = "";
      wrap.insertAdjacentHTML("beforeEnd", html);
      console.log(html);
    });

  document.querySelectorAll(".menu").forEach((button) => {
    button.addEventListener("click", (e) => {
      let urlPath = `/${e.target.getAttribute("id")}`;
      //alert(urlPath);
      fetch(urlPath)
        .then(function (response) {
          return response.text();
        })
        .then(function (html) {
          let wrap = document.getElementById("content-wrap");
          wrap.innerHTML = "";
          wrap.insertAdjacentHTML("beforeend", html);
        });
    });
  });
}); //end DOM content loaded
