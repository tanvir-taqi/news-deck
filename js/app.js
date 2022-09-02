

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

      
        categoryLi.innerHTML = `<h6 onclick="loadNews(${category.category_id})">${category.category_name}</h6>`

      categoryContainer.appendChild(categoryLi)
        
    });
}

const loadNews = async (id)=>{
    
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data);

}


const displayNews = (data)=>{
    const newsArr =data.data
    
    const newsConatainer = document.getElementById('news-container')
    if(newsArr.length >0){
        newsConatainer.innerHTML = ''


        newsArr.forEach(news=>{
            
            
            const newsRow = document.createElement("div")
            newsRow.classList.add('row')
            newsRow.innerHTML = `
            <div class="col-12 col-sm-12 col-md-4 col-lg-4">
            <img src="${news.thumbnail_url}" alt="">
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8">
            <h3 class="">${news.title}</h3>
            <p class="">${news.details.slice(0,100)}</p>
            <div>
                <div class="author">
                    <div class="author-img">
                        <img src="${news.author.img}" alt="">
                    </div>
                    <div class="author-name-date">
                        <h5 class="">${news.author.name}</h5>
                        <small class="date">${news.author.published_date}</small>
                    </div>
                </div>
                <div class="view">
                    <i class="fa-regular fa-eye"></i>
                    <h6>${news.author.published_date}</h6>
                </div>
                <div class="details">
                    <h6>Details<span><i class="fa-solid fa-arrow-right"></i></span></h6>
                </div>
    
            </div>
        </div> `
        newsConatainer.appendChild(newsRow)
        })
    }
    else{
                
                newsConatainer.innerHTML = `<h2>No News Found</h2>`
    }
  
}





loadCategory()