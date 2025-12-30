// bibliotecas e codigos de terceiros
const formatter = (data) => {
  return{
    day: {
      numerico: dayjs(data).format('DD'),
      week:{
        short: dayjs(data).format('ddd'),
        long: dayjs(data).format('dddd'),
      }
    },
    month: dayjs(data).format('MMMM'),
    hour: dayjs(data).format('HH:mm')
}
}

const activity = {
  name: "Lunch",
  data: new Date("2025-12-27 9:41:17"),
  ended: true
}

let activities = [
  activity,{
    name: "Group Gym",
    data: new Date("2025-11-28 10:40:12"),
    ended: false
  },
  {
    name: "Gaming Session",
    data: new Date("2025-11-29 11:44:05"),
    ended: false
  }
]

// activities = []

const createActivityItem = (activity) => {
  let input = `
  <input 
  onchange="completeActivity(event)"
  value="${activity.data}"
  type="checkBox" 
  `
  if(activity.ended) {
    input = input + 'checked'
  }
  input = input + '>'
  const formatar = formatter(activity.data);
  return `
    <div class="card-bg">
    ${input}
    <div>
      <svg class="active" width="20" height="20" viewBox="0 0 406 406" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M395 203C395 97 309 11 203 11C97 11 11 97 11 203C11 309 97 395 203 395C309 395 395 309 395 203Z" stroke="#AFF445" stroke-width="22" stroke-miterlimit="10"/>
        <path d="M299 123L164.6 283L107 219" stroke="#AFF445" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg class="inactive" width="20" height="20" viewBox="0 0 406 405" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.5684 350.206C123.988 368.201 154.246 379.807 187 382.679V404.755C148.188 401.726 112.435 387.769 82.8115 365.963L98.5684 350.206ZM338.304 353.682C308.475 380.377 270.714 398.387 229 403.726V381.519C264.649 376.385 296.947 360.854 322.721 338.099L338.304 353.682ZM26.9062 244.378C33.877 273.687 47.9795 300.239 67.2783 322.099L51.6953 337.682C28.4578 311.716 11.8 279.74 4.35449 244.378H26.9062ZM401.646 244.378C395.587 273.155 383.426 299.688 366.585 322.566L350.827 306.809C363.951 288.269 373.676 267.157 379.094 244.378H401.646ZM67.2783 82.6562C39.1033 114.569 22 156.485 22 202.378H0C0 150.409 19.5519 102.99 51.6953 67.0732L67.2783 82.6562ZM366.585 82.1895C391.357 115.842 406 157.406 406 202.378H384C384 163.49 371.719 127.457 350.828 97.9463L366.585 82.1895ZM229 1.0293C270.713 6.36734 308.475 24.3784 338.304 51.0732L322.721 66.6562C296.947 43.9014 264.649 28.37 229 23.2363V1.0293ZM187 22.0762C154.246 24.9482 123.988 36.555 98.5684 54.5498L82.8105 38.792C112.434 16.986 148.188 3.02922 187 0V22.0762Z" fill="#A9A9A9"/>
      </svg>

      <span>${activity.name}</span>
    </div>
    
    <time class="short">
      ${formatar.day.week.short}.
      ${formatar.day.numerico} <br>
      ${formatar.hour}
    </time>

    <time class="full">${formatar.day.week.long}, ${formatar.day.numerico}th of ${formatar.month} at ${formatar.hour}h</time>
  </div>`
}

const actualizeActivitiesList = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  //verify if the list is empty
  if(activities.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`
  }

  for (let activity of activities){
    section.innerHTML += createActivityItem(activity)
  }
}
actualizeActivitiesList()

const saveActivity = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const name = formData.get('activity')
  const day = formData.get('day')
  const hour = formData.get('hour')
  const data = `${day} ${hour}`

  const newActivity = {
    name,
    data,
    ended: false
  }

  const activityExists = activities.find((activity) => {
    return activity.data == newActivity.data
  })

  if(activityExists) {
    return alert('Day/Hour not available')
  }

  activities = [newActivity, ...activities]
  actualizeActivitiesList()
}

const createSelectionDays = () => {
  const days = [
    '2025-01-01',
    '2025-01-02',
    '2025-01-03',
    '2025-01-04',
    '2025-01-05',
  ]
  let selectionDays = ''
  for(let day of days) {
    const formatar = formatter(day)
    const formattedDay = `
    ${formatar.day.numerico}
    ${formatar.month}
    `
    selectionDays += `
    <option value="${day}">${formattedDay}</option>
    `
  }

  document.querySelector('select[name="day"]')
  .innerHTML = selectionDays
}
createSelectionDays()

const createSelectionHours = () => {
  let availableHours = ''
  for(let i = 6; i < 23; i++) {
    const hour = String(i).padStart(2, '0')
    availableHours += `
    <option value="${hour}:00">${hour}:00</option>`
    availableHours += `
    <option value="${hour}:30">${hour}:30</option>`
  }
  document.querySelector('select[name="hour"]')
  .innerHTML = availableHours
}
createSelectionHours()

const completeActivity = (event) => {
  const input = event.target
  const inputData = input.value

  const activity = activities.find((activity) => {
    return activity.data == inputData
  })

  if(!activity) {
    return
  }

  activity.ended = !activity.ended
}