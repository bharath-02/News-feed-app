async function init() {
  let sportsNews = await fetchNews(
    "https://flipboard.com/topic/indiansports.rss"
  );

  if (sportsNews) {
    sportsNews.items.forEach((news, index) => {
      addNewsToCarousel(news, "sportsNews", index);
    });
  }

  let techNews = await fetchNews(
    "https://flipboard.com/topic/technology.rss"
  );

  if (techNews) {
    techNews.items.forEach((news, index) => {
      addNewsToCarousel(news, "techNews", index);
    });
  }

  let moviesNews = await fetchNews(
    "https://flipboard.com/topic/movies.rss"
  );

  if (moviesNews) {
    moviesNews.items.forEach((news, index) => {
      addNewsToCarousel(news, "moviesNews", index);
    });
  }
}

const fetchNews = async (newsString) => {
  try {
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${newsString}`
    );
    let news = await response.json();
    return news;
  } catch (error) {
    return null;
  }
};

const addNewsToCarousel = (news, id, index) => {
  let sportsCarousel = document.getElementById(id);
  let divElement = document.createElement("div");
  if(index) {
    divElement.setAttribute("class", "carousel-item");
  } else {
    divElement.setAttribute("class", "carousel-item active");
  }
  let card = `
    <a href=${news.link} target="_blank" class="text-decoration-none">
      <div class="card">
        <img src=${news.enclosure.link} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <h6 class="card-subtitle mt-3 mb-2 text-body-secondary">${news.author} <span class="w-5 h-5">.</span> ${news.pubDate.split(" ")[0]}</h6>
          <p class="card-text">${news.description}</p>
        </div>
      </div>
    </a>
  `;

  divElement.innerHTML = card;
  sportsCarousel.append(divElement);
};

export { init };
