const formatStatus = (status) => {
  switch (status) {
  case 0:
    return 'Cancelled'
  case 1:
    return 'Waiting Confirmation'
  case 2:
    return 'Order Confirmed'
  case 3:
    return 'Driver on the way to pick up'
  case 4:
    return 'Laundry process will start soon'
  case 5:
    return 'Laundry is being washed'
  case 6:
    return 'Laundry is being dried'
  case 7:
    return 'Laundry is being prepared'
  case 8:
    return 'Delivering laundry soon'
  case 9:
    return 'Completed'
  default:
    return 'Undefined'
  }
}

const formatButtonStatus = (status) => {
  switch (status) {
  case 0:
    return 'CANCELLED'
  case 1:
    return 'CONFIRM ORDER'
  case 2:
    return 'SEND DRIVER'
  case 3:
    return 'START LAUNDRY PROCESS'
  case 4:
    return 'START WASHING LAUNDRY'
  case 5:
    return 'START DRIYING LAUNDRY'
  case 6:
    return 'START PACKAGING LAUNDRY'
  case 7:
    return 'DELIVER LAUNDRY'
  case 8:
    return 'COMPLETE ORDER'
  case 9:
    return 'COMPLETED'
  default:
    return 'Undefined'
  }
}

export {
  formatStatus,
  formatButtonStatus
}
