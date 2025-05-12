const user = sessionStorage.getItem("user");

if (!user) {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (response.status === 404) {
        throw new Error("Not Found");
      }

      return response.json();
    })
    .then((data) => {
      const user = data[0];
      sessionStorage.setItem("user", JSON.stringify(user));
    });
}

if (user) {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((response) => {
      console.log(response);

      if (response.status === 404) {
        throw new Error("Not Found");
      }

      return response.json();
    })
    .then((data) => {
      const ul = document.createElement("ul");

      data.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${user.name}</span> - <span>${user.email}</span>`;
        ul.appendChild(li);
      });

      document.body.appendChild(ul);
    })
    .then(() => {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const ul = document.querySelector("ul");

          const li = document.createElement("li");
          li.innerHTML = `<span>${data.title}</span> - <span>${data.body}</span>`;
          ul.appendChild(li);
        });
    })
    .catch((error) => {
      console.log("o erro ocorreu e caiu aqui nesse catch");
      console.error(error);
    });
}

/* -------------------------------------------- */

navigator.geolocation.getCurrentPosition((position) => {
  const span = document.createElement("span");
  span.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;

  document.body.appendChild(span);
});
