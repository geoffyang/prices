function billFor(month, activeSubscription, users) {
    // your code here!

    // find daily rate
    // how many days in this month
    const billForMonth = +month.slice(0, 4)
    const billForYear = +month.slice(5)
    const billForDate = new Date(billForYear, billForMonth, 1)

    let billCalculationDay = firstDayOfMonth(billForDate)
    const billEnd = lastDayOfMonth(billForDate)
    const daysInMonth = billEnd - billCalculationDay
    let runningUserDays = 0;

    if (Object.keys(users).length > 0) { //check there are users

        while (billCalculationDay <= billEnd) {
            const eachUser = users.forEach(u => {
                const firstDay = u.activatedOn;
                const lastDay = u.deactivatedOn || billEnd;

                if (billCalculationDay >= firstDay && billCalculationDay <= lastDay) {
                    runningUserDays += 1;
                }

                billCalculationDay = nextDay(billCalculationDay)

            })
        }
    }// while there are users

    const rate = (activeSubscription?.monthlyPriceInDollars) / daysInMonth;
    if (rate) {
        return (runningUserDays * rate).toFixed(2);
    }


}





/*******************
* Helper functions *
*******************/

/**
  Takes a Date instance and returns a Date which is the first day
  of that month. For example:

  firstDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 1)

  Input type: Date
  Output type: Date
**/
function firstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
  Takes a Date object and returns a Date which is the last day
  of that month. For example:

  lastDayOfMonth(new Date(2019, 2, 7)) // => new Date(2019, 2, 28)

  Input type: Date
  Output type: Date
**/
function lastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
  Takes a Date object and returns a Date which is the next day.
  For example:

  nextDay(new Date(2019, 2, 7))  // => new Date(2019, 2, 8)
  nextDay(new Date(2019, 2, 28)) // => new Date(2019, 3, 1)

  Input type: Date
  Output type: Date
**/
function nextDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}
