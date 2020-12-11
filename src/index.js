const URL = 'http://localhost:3000'
let dayId = 40

/**** DOM ELEMENTS ****/
const intentionsContainer = document.querySelector(".intentions-info")
const motivation = document.querySelector('.motivation')
const mainWorkout = document.querySelectorAll('.workout-card')[1]
const breakfast = document.querySelectorAll('.meal-card')[0]
const trackingForm = document.querySelector('#tracking-form')
const header = document.querySelector('header')
const intentionsForm = document.querySelector("#intentions-form")

/**** EVENT LISTENERS/HANDLERS ****/

header.addEventListener('click', event => {
    if(event.target.textContent === "Tracking"){
        console.log("tracking")
    }else if(event.target.textContent === "Meals"){
        console.log("meals")
    }else if(event.target.textContent === "Workout Schedule"){
        console.log("workout")
    }else if(event.target.textContent === "Daily Intentions"){
        renderDailyIntentionsForm()
    }
})

intentionsForm.addEventListener("submit", event => {
    event.preventDefault()
    const newGoalObj = {
        sleep: parseInt(event.target.sleep.value),
        nutrition: event.target.nutrition.value,
        hydration: parseInt(event.target.hydration.value),
        steps: parseInt(event.target.steps.value),
        intentions: event.target.intentions.value,
        reflections: event.target.reflections.value,
        day_id: parseInt(event.target.day.value)
    }
    createNewGoal(newGoalObj)
    console.log(newGoalObj)
})

trackingForm.addEventListener('submit', event => {
    event.preventDefault()
    // debugger
    const newTrackingObj = {
        weight: parseInt(event.target.weight.value),
        chest: parseInt(event.target.chest.value),
        hips: parseInt(event.target.hips.value),
        thigh: parseInt(event.target.thighs.value),
        waist: parseInt(event.target.waist.value),
        arm: parseInt(event.target.arm.value),
        week_id: parseInt(event.target.week.value)
    }

    createNewTracking(newTrackingObj)
    const trackingComponent = new TrackingComponent(newTrackingObj)
})

/**** FETCHES ****/

const getGoals = () => {
    fetch(`${URL}/goals`)
    .then(r => r.json())
    .then(goals => {
        goals.forEach(goal => {
            const goalComponent = new GoalComponent(goal)
            goalComponent.render(intentionsContainer)
        })
    })
}

const createNewGoal = (goalObj) => {
    fetch(`${URL}/goals`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(goalObj)
    })
    .then(r => r.json())
    .then(goal => console.log('succes', goal))
}

const getWorkouts = () => {
    fetch(`${URL}/workouts`)
    .then(r => r.json())
    .then(workouts => {
        workouts.forEach(workout => {
            const workoutComponent = new WorkoutComponent(workout)
            workoutComponent.render(mainWorkout)
        })
    })
}

const getMeals = () => {
    fetch(`${URL}/meals`)
    .then(r => r.json())
    .then(meals => {
        meals.forEach(meal => {
            const mealComponent = new MealComponent(meal)
            mealComponent.render(breakfast)
        })
    })
}

const createNewTracking = (trackingObj) => {
    fetch(`${URL}/trackings`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(trackingObj)
    })
    .then(r => r.json())
    .then(newObj => console.log("success", newObj))
}
/**** RENDER FUNCTIONS ****/

const renderMotivationalQuote = () => {
    const number = Math.floor(Math.random() * 1000)
    fetch("https://type.fit/api/quotes")
    .then(r => r.json())
    .then(quotes => {
        const quote = motivation.querySelector('h1')
        quote.textContent = quotes[number].text
        const author = motivation.querySelector('p')
        author.textContent = quotes[number].author
    })
}

renderDailyIntentionsForm = () => {
    intentionsForm.parentElement.style.display = ""
    console.log("hi")
}

/**** INITIALIZE ****/
getGoals()
renderMotivationalQuote()
getWorkouts()
getMeals()