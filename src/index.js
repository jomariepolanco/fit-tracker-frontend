const URL = 'http://localhost:3000'
let dayId = 1

/**** DOM ELEMENTS ****/
const intentionsInfo = document.querySelector(".intentions-info")
const motivation = document.querySelector('.motivation')

const getIntentions = () => {
    fetch(`${URL}/goals`)
    .then(r => r.json())
    .then(goals => {
        const goal = goals.find(goal => goal.day_id == dayId)
        console.log(goal)
        renderIntentions(goal)
    })
}

const renderIntentions = (goal) => {
    const date = intentionsInfo.querySelector('h3')
    date.textContent = `Day ${goal.day_id}`
    const sleep = intentionsInfo.querySelector('.sleep')
    sleep.textContent = `${goal.sleep} hours`
    const nutrition = intentionsInfo.querySelector('.nutrition')
    nutrition.textContent = goal.nutrition
    const hydration = intentionsInfo.querySelector('.hydration')
    hydration.textContent = `${goal.hydration} mL`
    const intentions = intentionsInfo.querySelector('.intention')
    intentions.textContent = goal.intentions 
    const reflections = intentionsInfo.querySelector('.reflections')
    reflections.textContent = goal.reflections 
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


/**** INITIALIZE ****/
getIntentions()
renderMotivationalQuote()