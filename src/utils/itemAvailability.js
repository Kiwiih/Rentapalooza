//* This script checks if items is available or not depending on if rental date is expired
// ----------------------------------------------------------------------------------------

const refreshItemAvailability = (items, rentals) => {
  // a map holding key-value pair of item ID and the value of their availability
  const availabilityMap = {}

  // loop through all rentals
  rentals.value.forEach((rental) => {
    // save start- and endDates from all rentals
    const rentalStartDate = new Date(rental.startDate)
    const rentalEndDate = new Date(rental.endDate)
    // Get current date
    const today = new Date()

    // If current date is within the timeframe of start and end..
    if (today >= rentalStartDate && today <= rentalEndDate) {
      // ..mark as "unavailable"
      availabilityMap[rental.itemId] = false
    } else if (!(rental.itemId in availabilityMap)) {
      // and if there's no matching rental.itemId inside map, make it available
      availabilityMap[rental.itemId] = true
    }
  })

  // Update "items" based on what the map contains
  items.value = items.value.map((item) => {
    if (availabilityMap[item.id] !== undefined) {
      item.isAvailable = availabilityMap[item.id]
    }
    return item
  })

  return items.value
}

export default refreshItemAvailability
