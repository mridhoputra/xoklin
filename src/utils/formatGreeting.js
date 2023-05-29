import moment from 'moment/moment'

const formatGreeting = () => {
  const currentHour = moment().format('HH')
  if (currentHour >= 5 && currentHour < 11) {
    return 'Good Morning,'
  } else if (currentHour >= 11 && currentHour < 15) {
    return 'Good Afternoon,'
  } else if (currentHour >= 15 && currentHour < 18) {
    return 'Good Afternoon,'
  } else if (currentHour >= 18 || currentHour < 5) {
    return 'Good Evening,'
  } else {
    return 'Hello'
  }
}

export default formatGreeting
