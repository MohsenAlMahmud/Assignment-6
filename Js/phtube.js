const loadVideos = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadVideosHandler('${category.category_id}')" class="btn btn-secondary w-24 my-2">${category.category}</button>
        `;
        tabContainer.appendChild(div);
    });
    if (data.data.length > 0) {
        const firstCategory = data.data[0];
        loadVideosHandler(firstCategory.category_id);
    }

};

const loadVideosHandler = async (categoryId) => {
    
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (data.data.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-gray-100 w-full md:mx-[150px] lg:mx-[650px] md:my-64 mt-6">
        <div class="">
            <img class="mx-28" src="./Icon.png" alt="">
            <h2 class="text-center text-black text-3xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
        </div>
        </div>
        `;
        cardContainer.appendChild(div);       
    }
    else {
        data.data.forEach((videos) => {
            console.log(videos);
            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card bg-gray-100 gap-4 mt-4 mx-4 ">                
                <figure class="position: relative w-full h-56  rounded-md shadow-xl ">
                <img class="w-full h-full" src="${videos.thumbnail}" />
                </figure>
                <p class="text-white bg-gray-950 position: absolute w-fit rounded-md ml-36 mt-48 px-1">${(Math.round(videos.others.posted_date / 60) - Math.round(videos.others.posted_date / 60) % 60) / 60} hrs   ${Math.round(videos.others.posted_date / 60) % 60} mins ago </p>
                <div class="card-body">
                    <div class="flex p-3 gap-6">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${videos.authors[0].profile_picture}" alt="">
                        </div>
                        <div>
                            <p class="text-lg text-black font-bold">${videos.title}</p>
                            <div class="flex gap-4">
                            <p>${videos.authors[0].profile_name}</p>
                            <p>${videos.authors[0].verified ? `<img src="./fi_10629607.svg" alt="">` : ''}</p> 
                            </div>
                            <p>${videos.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
            cardContainer.appendChild(div);
        });
    }
}
loadVideos()
const blogPage = () =>{
    const blogHtmlFile = 'blog.html';
    window.open(blogHtmlFile);
}
