function loadCategory() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=> res.json())
    .then((data)=> displayCategories(data.categories));
}

function displayCategories(categories) {
    console.log(categories);
}

loadCategory();