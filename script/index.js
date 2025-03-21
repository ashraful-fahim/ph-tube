const removeActiveClass = () => {
    const activeButton = document.getElementsByClassName("active");

    for (let btn of activeButton) {
        btn.classList.remove("active");
    }
}

function loadCategory() {
    //1 - fetching the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        //2 - convert promise to json
        .then((res) => res.json())
        //3 - send data to display
        .then((data) => displayCategories(data.categories));
}

function loadVideo() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");

            displayVideos(data.videos);
        })
}

function displayCategories(categories) {
    // get the container
    const categoryContainer = document.getElementById('category-container');
    // loop through the array of object
    for (let cat of categories) {
        // create element
        // console.log(cat.category)
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="displayCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `

        // append element
        categoryContainer.appendChild(categoryDiv);
    }

}

const displayCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");

            displayVideos(data.category)
        })

}


const displayVideos = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById('video-container');

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-1/9" src="./assets/Icon.png" alt="">
            <p class="pt-5 text-xl font-bold">Oops!! 
                <br>Sorry, There is no content here</p>
        </div>
        `
        return;
    }

    videos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[180px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-3 bg-black text-white rounded-sm p-1">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-4 py-3 pr-1 space-y-2">
                <div>
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h1 class="text-lg font-semibold">${video.title}</h1>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} ${
                        video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">` : ``
                    }</p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `
        videoContainer.appendChild(videoCard);
    });

};

const loadVideoDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class="card bg-base-100">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>

    `
    // console.log(video)
}


loadCategory();

// {
// "category_id": "1001",
// "video_id": "aaaa",
// "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
// "title": "Shape of You",
// "authors": [
// {
// "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
// "profile_name": "Olivia Mitchell",
// "verified": ""
// }
// ],
// "others": {
// "views": "100K",
// "posted_date": "16278"
// },
// "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }