const URL = 'http://localhost:3000'
let user = {}

/**** DOM ELEMENTS ****/
const main = document.querySelector("main")
const loginForm = document.querySelector('#login')
const motivation = document.querySelector(".motivation")
const userCard = document.querySelector(".user")

/**** EVENT LISTENERS/HANDLERS ****/

/**** FETCHES ****/

const setUser = (username, password) => {
    return fetch(`${URL}/users`)
    .then(r => r.json())
    .then(usersObj => renderMain(usersObj, username, password))
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
    renderUserInfo()
    renderMotivationalQuote()
    renderStats()
    renderStatsForm()
    renderWorkoutCalendar()
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

const renderStats = () => {
    console.log("view stats")
}

const renderStatsForm = () => {
    console.log("stats form")
}

const renderWorkoutCalendar = () => {
    console.log("workouts")
}

/**** INITIALIZE ****/

logIn()
