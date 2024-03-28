const searchBox=document.querySelector('.SearchBox')
const searchBtn=document.getElementById('btn')
const recipeContainer=document.querySelector('.recipe-container')
const recipeCloseButton=document.querySelector('.recipe-close-button')
const recipeDetailsContent=document.querySelector('.recipe-details-content')

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML="<h2>Please Search Recipe...</h2>"
        return;
    }
    

    fetchRecipe(searchInput)
})
recipeCloseButton.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none"
    
})
async function fetchRecipe(query){
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    try{
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const jsonData=await response.json()
        recipeContainer.innerHTML=""
        console.log(jsonData)
        jsonData.meals.forEach(meal => {
            const recipeDiv=document.createElement('div')
            recipeDiv.classList.add('recipe')
            recipeDiv.innerHTML=
            `<img src="${meal.strMealThumb}">
             <h3>${meal.strMeal}</h3>
             <p>${meal.strArea}</p>
             <p>${meal.strCategory}</p>
            `
            const button=document.createElement('button')
            button.addEventListener('click',()=>{
               openRecipePopup(meal)
            //    console.log(button)
            })
            button.textContent="View Recipe"
            recipeDiv.appendChild(button)
            recipeContainer.appendChild(recipeDiv)
        });
    }
    catch(err){
        recipeContainer.innerHTML="<h2>Error in Fetching Recipes...</h2>"
    }
   

}
const fetchIngredients=(meal)=>{
    let ingredientList=""
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`]
        console.log(ingredient)
        if(ingredient){
            const measure=meal[`strMeasure${i}`]
            ingredientList+=`<li>${measure}${ingredient}</li>`
        }else{
            break;
        }
    }
    return ingredientList;
}


const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`<h2 class="recipe-name">${meal.strMeal}</h2>
 <h3>Ingredients:</h3>
 <ul class="ingradientList">${fetchIngredients(meal)}</ul>
 <h3>Procedure:</h3>
 <p class="procedure">${meal.strInstructions}</p>`
 
 recipeDetailsContent.parentElement.style.display="block"
}