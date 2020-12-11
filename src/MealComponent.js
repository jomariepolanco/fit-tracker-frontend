class MealComponent {

    static all = []

    constructor(mealObj){
        this.meal = mealObj
        MealComponent.all.push(this)
    }

    render(breakfast){
        breakfast.querySelector('h4').textContent = this.meal.name 
        breakfast.querySelector('p').textContent = this.meal.ingredients
    }
}