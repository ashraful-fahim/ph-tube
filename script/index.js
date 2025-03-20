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
        .then((data) => displayVideos(data.videos))
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
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `

        // append element
        categoryContainer.appendChild(categoryDiv);
    }

}


const displayVideos = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById('video-container');
    videos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `
        videoContainer.appendChild(videoCard);
    });

};



// authors
// : 
// [{…}]
// category_id
// : 
// "1001"
// description
// : 
// "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// others
// : 
// {views: '100K', posted_date: '16278'}
// thumbnail
// : 
// "https://i.ibb.co/L1b6xSq/shape.jpg"
// title
// : 
// "Shape of You"
// video_id
// : 
// "aaaa"

loadCategory();
loadVideo();