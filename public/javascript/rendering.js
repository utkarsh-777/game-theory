// TODO
/*
  1) CHANGE FETCH URL AFTER COMPLETION OF SNS 
*/

// FEATURES

/* 
1) MOST OF THE CSS IS BY DEFAULT INHERITED FROM SHOPIFY THEME
*/

// VARIABLES

const ratingStarsChecked = '<span class="fa fa-star checked"></span>';
const ratingStarsUnchecked = '<span class="fa fa-star"></span>';
const ratingStarHalf =
  '<span class="fa fa-star-half-o"  aria-hidden="true" style="color: yellow"></span>';

function start() {
  let isData = true;
  let reviewsPageNumber = 1;
  let totalPages;
  let cardsDiv;
  let formElem;
  let ratingValue = 5;
  // let meta = { product: { id: 3 } };
  // window.meta = meta;
  const formSubmitFunction = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    formElem = document.querySelector("#review-form");
    new FormData(formElem);
    if (document.querySelector(".form-popup")) {
      document.querySelector(".popup-btn").innerHTML = "write a review";
      document
        .querySelector(".form-popup")
        .setAttribute("class", "display-none");
    }
  };

  var loading = ` 
<div class="loader">
    <div class="loader loader-1">
    <div class="loader-outter"></div>
    <div class="loader-inner"></div>
    </div>
</div>`;

  const pagination = `
<div class="pagination">
  <button class="" id = "btn-prev">prev</button>
  <p class="pagination-page-number" >1</p>
  <button class="" id = "btn-next">next</button>
</div>
`;

  const reviewCard = `<div class="card">
<div class="card-top">
  <div class="name">
    <div class="img one" alt="">{{nameBadge}}</div>
    <div>
      <div class="rate">
        {{ratingStar}}
      </div>
       <div>
       {{verified}}
             
                <span class="review-username">{{full name}}</span>    
            </div>   
    </div>
  </div>
</div>

<div class="card-content">
  <h2 class="card-content-heading">{{heading}}</h2>
  <p>{{description}}</p>
</div>

<div class="card-action">
  <span>{{date}}</span>
</div>
</div>`;

  const formButtonEventListener = () => {
    if (document.querySelector(".display-none")) {
      document.querySelector(".popup-btn").innerHTML = "write a review";
      document
        .querySelector(".display-none")
        .setAttribute("class", "form-popup");
    } else if (document.querySelector(".form-popup")) {
      document.querySelector(".popup-btn").innerHTML = "cancel review";
      document
        .querySelector(".form-popup")
        .setAttribute("class", "display-none");
    }
  };
  {
    /* <a href="#" class="popup-close" onClick="document.querySelector('.form-popup').setAttribute('class','display-none')" >x</a>    */
  }

  const reviewBlock = `
<div class="review-block" style="margin-top: 50px">
<h2 class="review__heading--title">CUSTOMER REVIEWS</h2>
<h4 style="margin-bottom: 20px; text-align: center;" class="average-ratings-block"></h4>
<button class="popup-btn">write a review </button>

<div class="display-none" id="form-popup">
  <div class="form-popup--content">
        
    <div class="review-form">
      <form id="review-form" >
        <label for="name">name:</label>
        <input type="text" id="name" name="name" required  placeholder="Enter your name (public)">
        <label for="email">email:</label>
        <input type="email" id="email" name="email" required placeholder="Enter your email (private)">
        <label for="Rating">Rating</label>
        <ul class="rating-from">
          <li class="rating-from-item" data-rate="1"></li>
          <li class="rating-from-item" data-rate="2"></li>
          <li class="rating-from-item" data-rate="3"></li>
          <li class="rating-from-item" data-rate="4"></li>
          <li class="rating-from-item active" data-rate="5"></li>
        </ul>
        <label for="review-heading">Review Heading:</label>
        <input type="text" id="review-heading" name="reviewHeading" placeholder="Give your review a atitle(public)" >
        <label for="review-description">Review description:</label>
        <textarea id="review-description" name="reviewDescription" rows="3" cols="50" > </textarea>
        <button>submit</button>
      </form>
    </div>
  </div>

</div>
<div class="cards">
</div>
</div>
`;

  const reviewForm = `
`;

  // EVENT LISTENERS

  const eventListeners = () => {
    // PREVIOUS BUTTON EVENT LISTENERS
    document.getElementById("btn-prev").addEventListener("click", (event) => {
      // IF PAGE NUMBER == 1 PREVIOUS BUTTON WILL BE HIDDEN ELSE VISIBLE
      // MAKE NEXT BUTTON VISIBLE

      document.getElementById("btn-next").style.visibility = "visible";
      if (reviewsPageNumber > 1) {
        reviewsPageNumber--;
        if (reviewsPageNumber == 1) {
          document.getElementById("btn-prev").style.visibility = "hidden";
        }
        document.querySelector(
          ".pagination-page-number"
        ).innerHTML = reviewsPageNumber;
        getData();
      } else alert("no more data");
    });

    document.querySelector(".popup-btn").addEventListener("click", (event) => {
      if (document.querySelector(".display-none")) {
        document.querySelector(".popup-btn").innerHTML = "cancel review";
        document
          .querySelector(".display-none")
          .setAttribute("class", "form-popup");
      } else if (document.querySelector(".form-popup")) {
        document.querySelector(".popup-btn").innerHTML = "write a review";
        document
          .querySelector(".form-popup")
          .setAttribute("class", "display-none");
      }
    });

    document.getElementById("btn-next").addEventListener("click", (event) => {
      // NEXT BUTTON  -> IF PAGE NUMBER == TOTALPAGENUMBERS NEXT BUTTON WILL BE HIDDEN ELSE VISIBLE
      // MAKE PREV BUTTON VISIBLE
      document.getElementById("btn-prev").style.visibility = "visible";
      reviewsPageNumber++;
      if (reviewsPageNumber >= totalPages) {
        document.getElementById("btn-next").style.visibility = "hidden";
      }
      document.querySelector(
        ".pagination-page-number"
      ).innerHTML = reviewsPageNumber;
      getData();
    });

    document
      .querySelector("#review-form")
      .addEventListener("submit", formSubmitFunction);

    // formdata handler to retrieve data
    formElem = document.querySelector("#review-form");
    formElem.addEventListener("formdata", (e) => {
      console.log("formdata fired");

      // Get the form data from the event object
      let data = e.formData;
      const obj = {};
      for (var pair of data.entries()) {
        // console.log(pair[0] + ", " + pair[1]);
        obj[pair[0]] = pair[1];
      }
      (obj.productId =
        window.meta && window.meta.product
          ? window.meta.product.id
          : undefined),
        (obj.productUrl = window.location.href);
      obj.source = "web";
      obj.shopUrl = window.location.hostname;
      obj.rating = ratingValue;
      obj.productName =
        window.meta &&
        window.meta.product &&
        window.meta.product.variants &&
        window.meta.product.variants.length
          ? window.meta.product.variants[0].name
          : undefined;
      console.log(obj);
      fetch(`http://127.0.0.1:8080/api/v1/review/createReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then(function (response) {
          // Examine the text in the response
          alert("data sent successfully");
        })
        .catch((error) => alert(error));
    });

    console.log("...");
    const container = document.querySelector(".rating-from");
    const items = container.querySelectorAll(".rating-from-item");
    container.onclick = (e) => {
      const elClass = e.target.classList;
      // change the rating if the user clicks on a different star
      if (!elClass.contains("active")) {
        items.forEach(
          // reset the active class on the star
          (item) => item.classList.remove("active")
        );
        ratingValue = e.target.getAttribute("data-rate");
        console.log(e.target.getAttribute("data-rate"));
        elClass.add("active"); // add active class to the clicked star
      }
    };

    // HTML CODE TO INJECT THROUGH JS
  };

  // THIS IS INIT IT WILL RUN FIRST WHEN FILE WILL BE LOAD
  // THIS WILL ADD HTML IN MAIN SHOPIFY PAGE AND FETCH DATA FROM DB
  function init() {
    cardsDiv = `
  <div class="cards">
  
  </div>`;

    document
      .querySelector("footer")
      .insertAdjacentHTML("beforebegin", reviewBlock);

    const bodyData = {
      isPublished: true,
      product:
        window.meta && window.meta.product ? window.meta.product.id : undefined,
    };

    fetch(
      `http://127.0.0.1:8080/api/v1/review/reviewCount/${window.location.hostname}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    )
      .then(function (response) {
        // Examine the text in the response
        response.json().then(function (data) {
          totalPages = Math.ceil(data.length / 5);
          document
            .querySelector("footer")
            .insertAdjacentHTML("beforebegin", pagination);
          getData();
          eventListeners();
        });
      })
      .catch((error) => alert(error));
  }

  init();

  // THIS WILL CREATE HTML CODE WITH GIVEN DATA WHICH WE GET FROM DB
  const createReviewHtml = (reviews, stats) => {
    console.log(
      "🚀 ~ file: script.js ~ line 268 ~ createReviewHtml ~ stats",
      stats
    );
    console.log(reviews);
    cardsDiv = document.querySelector(".cards");
    console.log(cardsDiv);

    // NICE TO HAVE FEATURE
    // 1) WILL GIVE CUSTOMER THE OPTIONS TO CHANGE THE NO REVIEW TEXT
    if (!reviews.length) {
      isData = false;
      cardsDiv.innerHTML = `<h1 style="text-align: center;">No Reviews</h1>`;
      document.querySelector(".pagination").innerHTML = "";
      document.getElementById("btn-next").style.display = "none";
      return;
    }
    // ADD LOADING SPINNER
    cardsDiv.innerHTML = loading;
    let script = "";
    for (let i = 0; i < reviews.length; i++) {
      let review = reviewCard.replace("{{full name}}", reviews[i].customerName);
      let nb = reviews[i].customerName.split(" ")[0][0];
      if (reviews[i].customerName.split(" ")[1])
        nb += reviews[i].customerName.split(" ")[1][0];
      nb = nb.toUpperCase();
      review = review.replace("{{nameBadge}}", nb);
      let rate = "";

      for (let j = 1; j <= 5; j++) {
        if (j <= reviews[i].rating) rate += ratingStarsChecked;
        else {
          rate += ratingStarsUnchecked;
        }
      }
      review = review.replace("{{ratingStar}}", rate);
      review = review.replace("{{date}}", reviews[i].createdAt.split("T")[0]);
      review = review.replace("{{description}}", reviews[i].description);
      review = review.replace("{{heading}}", reviews[i].heading);
      if (reviews[i].source != "web") {
        review = review.replace(
          "{{verified}}",
          ` <div class = "review-badge">
       Verified Buyer
      </div>`
        );
      } else if (reviews[i].isVerified)
        review = review.replace(
          "{{verified}}",
          ` <div class = "review-badge">
           Verified
       </div>`
        );
      else review = review.replace("{{verified}}", "");
      script += review;
    }
    // script = script.replace(
    //   "{{AVG_RATINGS_BLOCK}}",
    //   `${Math.round(10 * stats.avgRating) / 10} based on ${
    //     stats.totReviews
    //   } reviews`
    // );

    let avgRatingStats = "";
    let avgRatingValue = Math.round(10 * stats.avgRating) / 10;
    avgRatingValue = Math.round(2 * stats.avgRating) / 2;
    let avgRatingFloor = Math.floor(avgRatingValue);

    for (let j = 1; j <= avgRatingFloor; j++) {
      avgRatingStats += ratingStarsChecked;
    }
    ratingStarHalf;
    if (avgRatingValue == avgRatingFloor) {
      for (let j = 1; j <= 5 - avgRatingFloor; j++) {
        avgRatingStats += ratingStarsUnchecked;
      }
    } else {
      avgRatingStats += ratingStarHalf;
      for (let j = 1; j <= 4 - avgRatingFloor; j++) {
        avgRatingStats += ratingStarsUnchecked;
      }
    }
    const block = document.querySelector(".average-ratings-block");
    if (block)
      block.innerHTML = `${avgRatingStats} based on ${stats.totReviews} reviews`;
    cardsDiv.innerHTML = script;
  };

  // FETCH DATA FROM DB
  const getData = () => {
    cardsDiv.innerHTML = loading;
    fetch(
      `http://127.0.0.1:8080/api/v1/review/fetchReviews/${window.location.hostname}?page=${reviewsPageNumber}&limit=5&product=${window.meta.product.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
      .then(function (response) {
        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data.data.reviews);
          createReviewHtml(data.data.reviews, data.data.stats);
        });
      })
      .catch((error) => console.log(error));
  };
}
// ADD CSS FILE
function initCss() {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/gh/atisheyJain03/temp_script/review_rendering7.css"
  );
  document.head.appendChild(link);
}
initCss();
if (window.meta && window.meta.product) start();
else console.log("not a product page");
if (window.location.href.split("/").includes("collections")) {
  const getData = (productId) => {
    fetch(`http://127.0.0.1:8080/api/v1/review/averageRating/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then(function (response) {
        response.json().then(function (data) {
          console.log("🚀 ~ file: script.js ~ line 441 ~ data", data);
          console.log(
            "🚀 ~ file: script.js ~ line 442 ~ data",
            data.data.stats
          );
          if (!data.data) {
            console.log(data + "................");
            // console.log("***********");
            return;
          }
          const stats = data.data.stats;
          if (!stats) {
            console.log("🚀 ~ file: script.js ~ line 443 ~ stats", stats);
            return;
          }

          let avgRatingStats = "";
          let avgRatingValue = Math.round(10 * stats.avgRating) / 10;
          avgRatingValue = Math.round(2 * stats.avgRating) / 2;
          let avgRatingFloor = Math.floor(avgRatingValue);

          for (let j = 1; j <= avgRatingFloor; j++) {
            avgRatingStats += ratingStarsChecked;
          }
          ratingStarHalf;
          if (avgRatingValue == avgRatingFloor) {
            for (let j = 1; j <= 5 - avgRatingFloor; j++) {
              avgRatingStats += ratingStarsUnchecked;
            }
          } else {
            avgRatingStats += ratingStarHalf;
            for (let j = 1; j <= 4 - avgRatingFloor; j++) {
              avgRatingStats += ratingStarsUnchecked;
            }
          }
          const block = document.querySelector(
            `[data-product_id=${productId}]`
          );
          if (block)
            block.innerHTML = `${avgRatingStats} (${stats.totReviews})`;
        });
      })
      .catch((error) => console.log(error));
  };
  let docs = document.querySelectorAll("[data-product_id]");
  console.log("🚀 ~ file: script.js ~ line 472 ~ docs", docs);
  for (let i = 0; i < docs.length; i++) {
    let productId = document.querySelectorAll("[data-product_id]")[i].dataset
      .product_id;
    console.log("🚀 ~ file: script.js ~ line 475 ~ productId", productId);
    getData(productId);
  }
}
