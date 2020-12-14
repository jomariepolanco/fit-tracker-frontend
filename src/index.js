const URL = 'http://localhost:3000'
let user = {}

/**** DOM ELEMENTS ****/
const main = document.querySelector("main")
const loginForm = document.querySelector('#login')
const motivation = document.querySelector(".motivation")
const userCard = document.querySelector(".user")
const statsCard = document.querySelector(".stats")
const workoutCalendar = document.querySelector(".workouts")
const statsForm = document.querySelector("#stats-form")
const header = document.querySelector("header")
const workoutsMain = document.querySelector("#workouts-main")
const allWo = document.querySelector(".all-workouts")
const myWorkouts = document.querySelector(".my-workouts")
const allExercises = document.querySelector(".all-exercises")
const exerciseMain = document.querySelector("#exercises-main")
const workoutForm = document.querySelector(".create-new-workouts")

/**** EVENT LISTENERS/HANDLERS ****/
header.addEventListener("click", event => {
    if (event.target.tagName === "A"){
        if (event.target.textContent === "Workouts"){
            workoutsMain.style.display = ""
            renderAllWorkouts()
            main.style.display = "none"
            exerciseMain.style.display = "none"
        } else if (event.target.textContent === "Exercises"){
            exerciseMain.style.display = ""
            main.style.display = "none"
            workoutsMain.style.display = "none"
            renderExercisesPage()
        } else if (event.target.textContent === "Create a Workout"){
            exerciseMain.style.display = "none"
            main.style.display = "none"
            workoutsMain.style.display = "none"
            workoutForm.style.display = ""
        }
    }
})


statsForm.addEventListener("submit", event => {
    event.preventDefault()
    const newStatsObj = {
        user_id: user.id,
        exercise_id: parseInt(event.target.exercise.value),
        weight: parseInt(event.target.weight.value),
        comment: event.target.comment.value
    }
    console.log(newStatsObj)
    createNewStat(newStatsObj)
    event.target.reset()
})
/**** FETCHES ****/

const renderAllWorkouts = () => {
    fetch(`${URL}/workouts`)
    .then(r => r.json())
    .then(workouts => {
        workouts.forEach(workout => renderWorkout(workout))
        const myWorkouts = workouts.filter(workout => workout.user_id == user.id)
        renderMyWorkouts(myWorkouts)
    })
}

const setUser = (username, password) => {
    return fetch(`${URL}/users`)
    .then(r => r.json())
    .then(usersObj => renderMain(usersObj, username, password))
}

const fetchStats = () => {
    fetch(`${URL}/stats`)
    .then(r => r.json())
    .then(statsData => renderStats(statsData))
}

const fetchWorkoutAppointments = () => {
    fetch(`${URL}/appointments`)
    .then(r => r.json())
    .then(appointments => renderWorkoutCalendar(appointments))
}

const fetchExercises = () => {
    fetch(`${URL}/exercises`)
    .then(r => r.json())
    .then(exercises => renderStatsForm(exercises))
}

const createNewStat = (statObj) => {
    fetch(`${URL}/stats`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(statObj)
    })
    .then(r => r.json())
    .then(stat => console.log("success", stat))
}
/**** RENDER FUNCTIONS ****/

renderExercisesPage = () => {
    fetch(`${URL}/exercises`)
    .then(r => r.json())
    .then(exercises => {exercises.forEach(exercise => {
        const div = document.createElement("div")
        div.className = exercise.name
        const h3 = document.createElement("h3")
        h3.textContent = exercise.name  
        const p = document.createElement("p")
        p.innerHTML = `${exercise.description}`
        div.append(h3, p)
        allExercises.append(div)
    })
})
}

renderWorkout = (workout) => {
    const div = document.createElement("div")
    div.className = workout.kind
    const h3 = document.createElement("h3")
    h3.textContent = workout.kind 
    const p = document.createElement("p")
    p.textContent = workout.exercises.map(ex => `${ex.name}`).join(", ")
    div.append(h3, p)
    allWo.append(div)
}

const renderMyWorkouts = (workouts) => {
    workouts.forEach(workout => {
        const div = document.createElement("div")
        div.className = workout.kind
        const h3 = document.createElement("h3")
        h3.textContent = workout.kind 
        const p = document.createElement("p")
        p.textContent = workout.exercises.map(ex => `${ex.name}`).join(", ")
        div.append(h3, p)
        myWorkouts.append(div)
    })
}

const logIn = () => {
    main.style.display = "none"

    loginForm.addEventListener("submit", event => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        setUser(username, password)
    })
}

const renderMain = (users, username, password) => {
    main.style.display = ""
    user = users.find(user => user.username === username && user.password === password)
    renderMotivationalQuote()
    renderUserInfo()
    fetchStats()
    fetchWorkoutAppointments()
    fetchExercises()
    loginForm.style.display = "none"
}

const renderUserInfo = () => {
    const name = document.createElement("h1")
    name.textContent = user.name
    const age = document.createElement("h4")
    age.textContent = `${user.age} years old`
    const height = document.createElement("h4")
    height.textContent = `${user.height} inches tall` 
    const weight = document.createElement("h4")
    weight.textContent = `${user.weight} pounds`
    const username = document.createElement("p")
    username.innerHTML = `<em>${user.username}</em>` 
    userCard.append(name, username, age, height, weight)
}

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

const renderStats = (statsData) => {
    const stats = statsData.filter(stats => stats.user=== user.username)
    stats.forEach(stat => {
        const div = document.createElement("div")
        div.className = "stats-info"
        const nameAndWeight = document.createElement("h3")
        nameAndWeight.textContent = `${stat.exercise}/${stat.weight} lbs`
        const comment = document.createElement("p")
        comment.textContent = stat.comment
        div.append(nameAndWeight, comment)
        statsCard.append(div)
    })
}

const renderStatsForm = (exercises) => {
    // console.log(exercises)
    // const user = document.createElement("input")
    // user.type = "text"
    // user.name = "user"
    // user.placeholder = "username"
    const xDropDown = document.createElement("select")
    xDropDown.name = "exercise"
    exercises.forEach(exercise => {
        const option = document.createElement("option")
        option.name = exercise.name 
        option.value = exercise.id 
        option.textContent = exercise.name 
        xDropDown.append(option)
    })

    statsForm.prepend(xDropDown)
}

const renderWorkoutCalendar = (appointments) => {
    const h1 = document.createElement("h1")
    h1.textContent = `${user.name}'s Workouts`
    const workouts = appointments.filter(app => app.user === user.username)
    workouts.forEach(workout => {
        const h3 = document.createElement("h3")
        h3.textContent = workout.workout 
        const p = document.createElement("p")
        p.textContent = `${workout.date} at ${workout.time} in ${workout.location}`
        workoutCalendar.append(h3, p)
    })
    workoutCalendar.prepend(h1)
}

/**** INITIALIZE ****/
logIn()
