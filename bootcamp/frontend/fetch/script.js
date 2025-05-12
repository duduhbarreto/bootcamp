fetch("http://localhost:3000/user")
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

// async function getUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
// }

// getUsers();
