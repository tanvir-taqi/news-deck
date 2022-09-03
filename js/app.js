


// load category
const loadCategory = async()=>{

    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayCategory(data);
      } catch (error) {
        console.error(error.message);
       
      }
      
       
}


// display categories in a list
const displayCategory = (data)=>{
    const categories = data.data.news_category
   
    const categoryContainer= document.getElementById('category-list')
    categories.forEach(category => {
        const categoryLi = document.createElement('li')

      
        categoryLi.innerHTML = `<h6 onclick="loadNews(${category.category_id},'${category.category_name}')" class="catogory-list-item">${category.category_name}</h6>`
        
      categoryContainer.appendChild(categoryLi)
        
    });
}

// load All news 
const loadNews = async (id , categoryName)=>{

    loadSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id ? id : '8'}`

    try{
        const res = await fetch(url)
        const data = await res.json()
        displayNews(data,categoryName);
    }
    catch(error){
        alert(error.message)
    }   

}

const sortArrayOfObject = (a,b)=>{
    if ( a.total_view < b.total_view ){
        return 1;
      }
      if ( a.total_view > b.total_view ){
        return -1;
      }
      return 0;

}

//display all news
const displayNews = (data,categoryName="All News")=>{
    console.log(data);
    
    const newsArr =data.data
    const newsArrsorted = newsArr.sort(sortArrayOfObject)
    
    const newsConatainer = document.getElementById('news-container')
    
    document.getElementById('data-found').innerHTML = `<h5>${newsArr.length} items found for <span class="color-text">${categoryName}</span></h5>`

    if(newsArr.length >0){
        newsConatainer.innerHTML = ''

        const noData = "No Data Available"
        newsArrsorted.forEach(news=>{

            const newsRow = document.createElement("div")
            newsRow.classList.add('row')
            newsRow.classList.add('news')

            newsRow.innerHTML = `
            <div class="col-12 col-sm-12 col-md-4 col-lg-4  ">
            <img class="news-thumbnail img-fluid" src="${news.thumbnail_url ? news.thumbnail_url : noData}" alt="">
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 py-4 ">
            <h4 class="">${news.title ? news.title : noData}</h4>
            <p class="">${news.details.slice(0,200)}...</p>
            <div class="news-footer">
                <div class="author">
                    <div class="author-img">
                        <img src="${news.author.img ? news.author.img : noData}" class="author-img px-2" alt="">
                    </div>
                    <div class="author-name-date my-2 ">
                        <h5 class="color-text px-1">${news.author.name ? news.author.name :noData }</h5>
                        <small class="date px-2">${news.author.published_date ? news.author.published_date : noData}</small>
                    </div>
                </div>
                <div class="view my-2">
                    
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
  loadSpinner(false)
}


// load single news
const detailsNews = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayDetails(data);
      } catch (error) {
        alert(error.message);
        
      }
      
    
}


// display single news on modal
const displayDetails = data =>{
    const singleNews = data.data[0]
    const detailsNews = document.getElementById("detailedNews")
    detailsNews.innerHTML = `
    <h4>${singleNews.title}</h4>
    <p>${singleNews.details}</p>
    <h6 class="color-text">Author: ${singleNews.author.name ? singleNews.author.name : "No Data Available"}</h6>
    <p>Published Date: ${singleNews.author.published_date}</p>
    <small>Rating: ${singleNews.rating.badge} ${singleNews.rating.number}/5.</small>
    `
}


//spinner load
const loadSpinner = isLoading=>{
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('d-none')
    }else{
        spinner.classList.add('d-none')
    }

}


loadNews()

loadCategory()