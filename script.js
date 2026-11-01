const timeline = document.getElementById("timeline");
const statusMessage = document.getElementById("status");
// Display the date in a more readable format.
function formatDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

// Create and display one post.
function createPost(post) {
  const article = document.createElement("article");
  article.className = "post";
  const heading = document.createElement("h2");
  heading.className = "post-heading";
  heading.textContent = post.name + " - ";
  const date = document.createElement("span");
  date.className = "post-date";
  date.textContent = formatDate(post.createdAt);
  heading.appendChild(date);
  const message = document.createElement("p");
  message.className = "post-message";
  message.textContent = post.message;
  article.appendChild(heading);
  article.appendChild(message);
  return article;
}

// Get the posts from the Express backend.
async function loadPosts() {
  try {
    const response = await fetch("/api/posts");
    if (!response.ok) {
      throw new Error("The server could not load the posts.");
    }
    const posts = await response.json();
    timeline.replaceChildren();
    if (posts.length === 0) {
      statusMessage.textContent = "There are no posts yet.";
      return;
    }
    statusMessage.textContent = "";
    posts.forEach((post) => {
      timeline.appendChild(createPost(post));
    });
  } catch (error) {
    statusMessage.textContent = "Unable to load posts. Please check that the server is running.";
    console.error(error);
  }
}

loadPosts();
