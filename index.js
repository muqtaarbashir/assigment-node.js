function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    let totalWorkingDays = 0;

    function isWorkingDay(date) {
        return date.getDay() !== 5;
    }

    function getWorkingDaysInMonth(year, month) {
        let workingDays = 0;
        let date = new Date(year, month, 1);

        while (date.getMonth() === month) {
            if (isWorkingDay(date)) {
                workingDays++;
            }
            date.setDate(date.getDate() + 1);
        }
        return workingDays;
    }

    let currentDate = new Date(start.getFullYear(), start.getMonth(), 1);

    while (currentDate <= end) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const totalDaysInMonth = getWorkingDaysInMonth(year, month);
        daysExcludingFridays.push(totalDaysInMonth);

        let workedDays = 0;
        let date = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        const actualStart = (currentDate.getTime() === start.getTime()) ? start : date;
        const actualEnd = (monthEnd > end) ? end : monthEnd;

        while (date <= actualEnd) {
            if (date >= actualStart && isWorkingDay(date)) {
                workedDays++;
            }
            date.setDate(date.getDate() + 1);
        }

        daysWorkedExcludingFridays.push(workedDays);
        totalWorkingDays += workedDays;

        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    const dailyTarget = totalAnnualTarget / 365;
    const totalTargetForPeriod = dailyTarget * totalWorkingDays;

    daysWorkedExcludingFridays.forEach((workedDays) => {
        monthlyTargets.push((workedDays * totalTargetForPeriod / totalWorkingDays).toFixed(2));
    });

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget: parseFloat(totalTargetForPeriod.toFixed(2))
    };
}

const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(result);
