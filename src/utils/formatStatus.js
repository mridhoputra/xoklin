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
    return 'Laundry in progress'
  case 5:
    return 'Ready to deliver'
  case 6:
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
    return 'DELIVER LAUNDRY'
  case 5:
    return 'COMPLETE ORDER'
  case 6:
    return 'COMPLETED'
  default:
    return 'Undefined'
  }
}

export {
  formatStatus,
  formatButtonStatus
}
