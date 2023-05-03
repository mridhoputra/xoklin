import moment from 'moment/moment'

const formatDate = (date) => {
  return moment(date).format('DD MMMM YYYY hh:mm A')
}

export default formatDate
