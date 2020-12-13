const URL = 'http://localhost:3000'
let user = {}

/**** DOM ELEMENTS ****/
const main = document.querySelector("main")
const loginForm = document.querySelector('#login')
const motivation = document.querySelector(".motivation")
const userCard = document.querySelector(".user")
const statsCard = document.querySelector(".stats")
const workoutCalendar = document.querySelector(".workouts")
/**** EVENT LISTENERS/HANDLERS ****/

/**** FETCHES ****/

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
/**** RENDER FUNCTIONS ****/

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
    renderStatsForm()
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
    console.log(stats)
}

const renderStatsForm = () => {
    console.log("stats form")
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
