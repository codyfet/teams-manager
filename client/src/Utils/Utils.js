
/**
 * Функция считает текущую степени укомплектованности команды, т.е.
 * соотношение необходимого количества людей (capacity) и количества уже набранных в команду людей (точнее их степеней участия).
 *
 * @param {Object} team Объект Команда.
 *
 * @returns {number} Текущая степень укомплектованности команды.
 */
export const calculateActualTeamCapacity = (team) => {
    let totalTeamCapacity = 0;
    let currentPersonChargeability = 0;

    for (let i = 0; i < team.positions.length; i++) {
        totalTeamCapacity +=  team.positions[i].capacity;

        const postionLoads = team.positions[i].positionLoads;

        for (let j = 0; j < postionLoads.length; j++) {
            currentPersonChargeability += postionLoads[j].chargePercent;
        }
    }

    return parseInt(currentPersonChargeability / totalTeamCapacity);
};