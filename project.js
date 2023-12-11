let currentCategoryID = 1000;
const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="handleDisplay('${category.category_id}')" class="btn btn-outline-secondary"> ${category.category} </button>
        `;
    tabContainer.appendChild(div);
  });
};

const handleDisplay = async (categoryId, viewSorting) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const status = data.status;
  if (viewSorting) {
    data.data.sort((a, b) => {
      const sortingA = parseInt(a.others.views);
      const sortingB = parseInt(b.others.views);
      const sortedValue = sortingB - sortingA;
      return sortedValue;
    });
  }

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  data.data.forEach((videos) => {
    const sec = parseInt(videos.others.posted_date);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);

    const div = document.createElement("div");
    div.classList.add("box");
    div.innerHTML = `
    <div class="video-list">
  <div class="d-inline-block fit-content mt-3">
    <div class="d-inline-block fit-content mt-3"
        <figure>
            <img src="${videos?.thumbnail}" class="thumb-img" alt="">
            <span class="time">${hours ? `${hours} hours` : ""} ${
      minutes ? `${minutes} minutes ago` : ""
    }
            </span>  
        </figure>
          
        <div class="card-body">
        <img class="author-img d-flex" 
        src="${videos?.authors[0].profile_picture}" alt="Profile Picture">
        <img class="" src="${videos.authors[0].verified ? `images/verified.png` : ""}">
    <div class="channel-info d-flex flex-column">
    <h3 class="card-title">${videos.title}</h3>
      <p class="channel-name">${videos?.authors[0].profile_name}</p>
      <p class="views">${videos.others.views} views</p>
    </div>
        </div>
        </div>
        </div>
        </div>
        </div>`;
    cardContainer.appendChild(div);
  });

  const noContent = document.getElementById("no-content");
  if (data.data.length === 0) {
    noContent.removeAttribute("hidden");
  } else {
    noContent.setAttribute("hidden", true);
  }
};
const sortByView = () => {
  handleDisplay(currentCategoryID, true);
};

handleCategory();
handleDisplay("1000");
