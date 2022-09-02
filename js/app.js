



const loadCategory = async()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url)
        const data = await res.json()
        displayCategory(data);
}

const displayCategory = (data)=>{
    const categories = data.data.news_category
   
    const categoryContainer= document.getElementById('category-list')
    categories.forEach(category => {
        const categoryLi = document.createElement('li')

      
        categoryLi.innerHTML = `<h6 onclick="loadNews(${category.category_id}, '${category.category_name}')">${category.category_name}</h6>`
        
      categoryContainer.appendChild(categoryLi)
        
    });
}

const loadNews = async (id , categoryName)=>{


    
    const url = `https://openapi.programming-hero.com/api/news/category/0${id }`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data,categoryName);

}


const displayNews = (data,categoryName)=>{
    const newsArr =data.data
    
    const newsConatainer = document.getElementById('news-container')
    document.getElementById('data-found').innerHTML = `${newsArr.length} items found for ${categoryName}`

    if(newsArr.length >0){
        newsConatainer.innerHTML = ''

        const noData = "No Data Found"
        newsArr.forEach(news=>{

            const newsRow = document.createElement("div")
            newsRow.classList.add('row')
            newsRow.classList.add('news')

            newsRow.innerHTML = `
            <div class="col-12 col-sm-12 col-md-4 col-lg-4 ">
            <img class="news-thumbnail" src="${news.thumbnail_url ? news.thumbnail_url : noData}" alt="">
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 py-4 px-2">
            <h3 class="">${news.title ? news.title : noData}</h3>
            <p class="">${news.details.slice(0,200)}...</p>
            <div class="news-footer">
                <div class="author">
                    <div class="author-img">
                        <img src="${news.author.img ? news.author.img : noData}" class="author-img px-2" alt="">
                    </div>
                    <div class="author-name-date">
                        <h5 class=" px-2">${news.author.name ? news.author.name :noData }</h5>
                        <small class="date px-2">${news.author.published_date ? news.author.published_date : noData}</small>
                    </div>
                </div>
                <div class="view">
                    
                    <h6><span><i class="fa-regular fa-eye"></i></span> ${news.total_view ? news.total_view : noData}</h6>
                </div>
                <div class="details" onclick="detailsNews('${news._id}')">
                    <h6 data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="details">Details <span><i class="fa-solid fa-arrow-right"></i></span></h6>
                </div>
    
            </div>
        </div> `
        newsConatainer.appendChild(newsRow)
        })
    }
    else{
                
                newsConatainer.innerHTML = `<h2 class="">No News Found</h2>`
    }
  
}

const detailsNews = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data);
}



const displayDetails = data =>{
    const singleNews = data.data[0]
    const detailsNews = document.getElementById("detailedNews")
    detailsNews.innerHTML = `
    <h4>${singleNews.title}</h4>
    <p>${singleNews.details}</p>
    <h6>${singleNews.author.name}</h6>
    <p>${singleNews.author.published_date}</p>
    <small>Rating: ${singleNews.rating.badge} ${singleNews.rating.number}/5.</small>
    `
}




loadCategory()