//  // Fetch blog data from an API endpoint
//  fetch('http://localhost:5646/add')
//  .then(response => response.json())
//  .then(data => {
//      const blogContainer = document.querySelector('.dashboard-data-container');

//      data.forEach(blog => {
//          const blogElement = document.createElement('div');
//          blogElement.classList.add('dashboard-blog-container');

//          // Populate blog content dynamically
//          blogElement.innerHTML = `
//              <div class="dashboard-blog-container-upper">
//                  <p class="title">${blog.title}</p>
//                  <p class="category-tag">${blog.category}</p>
//                  <a href="#" class="new-blog-link">Read more</a>
//              </div>
//              <table class="dashboard-blog-table">
//                  <tr>
//                      <th>Poster</th>
//                      <th>Likes</th>
//                      <th>Comments</th>
//                      <th>Date</th>
//                  </tr>
//                  <tr>
//                      <td>${blog.poster}</td>
//                      <td>${blog.likes}</td>
//                      <td>${blog.comments}</td>
//                      <td>${blog.date}</td>
//                  </tr>
//              </table>
//          `;

//          blogContainer.appendChild(blogElement);
//      });
//  })
//  .catch(error => console.error('Error fetching blog data:', error));

//  let categoryTag = document.querySelectorAll(".blog-category-tag");
//  let allTag = document.getElementById("all-tag");
//  categoryTag.innerHTML = "category";
//  let allBlogs = JSON.parse(localStorage.getItem("articles"));

//  allTag.addEventListener("click", () => {
//    showBlogs(allBlogs);
//  });

//  let APIBlogs = []; // Initialize the variable outside the fetch block
//  const apiUrl = "http://localhost:5646/add"; // Replace with your API URL

//  categoryTag.forEach((element) => {
//    element.addEventListener("click", () => {
//      element.classList.add("active-tag");
//      if (!element) {
//        element.classList.remove("active-tag");
//      }
//      const selectedCategory = element.innerText
//        .toLowerCase()
//        .split(" ")
//        .join("-");
//      const filteredBlogs = allBlogs.filter(
//        (blog) => blog.category === selectedCategory
//      );
//      showBlogs(filteredBlogs);
//    });
//  });

//  allTag.addEventListener("click", () => {
//    showBlogs(allBlogs);
//  });

//  function showBlogs(blogs) {
//    const blogCardsContainer = document.querySelector(
//      ".blog-container-section"
//    );
//    blogCardsContainer.innerHTML = "";

//    blogs.forEach((blog, index) => {
//      const card = document.createElement("a");
//      card.classList.add("blog-home-card");
//      card.href = `./homeblogs.html?index=${blog._id}`;

//      const img = document.createElement("img");
//      img.src = blog.poster;
//      img.alt = "Blog Image";
//      img.classList.add("blog-image");
//      card.appendChild(img);

//      const details = document.createElement("div");
//      details.classList.add("blog-home-card-details");

//      const category = document.createElement("div");
//      category.classList.add("rounded-text", "white-text", "category-tag");
//      category.innerHTML = `<p class="rounded-text category-tag active-tag bg-grey ">${blog.category
//        .split("-")
//        .join(" ")}</p>`;
//      details.appendChild(category);

//      const title = document.createElement("p");
//      title.classList.add("white-text", "title", "blog-title");
//      title.innerText = blog.title;
//      details.appendChild(title);

//      // Append other details (if needed)
//      // Add author info
//      const info = document.createElement("div");
//      info.classList.add("blog-home-card-info");

//      // Add avatar, author, date
//      info.innerHTML = `
// <img src="../assets/images/my-avatar.svg" alt="" class="avatar">
// <p class="grey-text">${blog.editor || "Angelo Christian"}</p> 
// <p class="grey-text">&#x2022;</p>
// <p class="grey-text">${blog.createdAt.split("T")[0]}</p>
// `;

//      details.appendChild(info);
//      card.appendChild(details);
//      blogCardsContainer.appendChild(card);
//    });
//  }

//  fetch(apiUrl)
//    .then((response) => response.json())
//    .then((data) => {
//      APIBlogs = data; // Assign the fetched data to the variable
//      console.log("data in fetch", data);
//      showBlogs(data.reverse());
//    })
//    .catch((error) => {
//      console.error("Error fetching data:", error);
//    });

//  // Now you can use APIBlogs outside the fetch block
//  console.log("APIBlog outside fetch:", APIBlogs);