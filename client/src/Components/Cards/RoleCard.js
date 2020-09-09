import React from "react";

/**
 * Карточка, описывающая характеристики позиции.
 *
 * @param {number} capacityCount Количество сотрудников, необходимое, чтобы заполнить данную позицию.
 * @param {number} actualCount Количество сотрудников, которые сейчас назначены на текущую позицию.
 * @param {number} percent Суммарная загрузка всех сотрудников для данной позиции.
 */
export const RoleCard = ({capacityCount, actualCount, percent}) => {
    return (
        <div className="card role-card">
            <div className="role-card-item">
                <div className="property">Необходимо</div>
                <div className="value">{capacityCount}</div>
            </div>
            <div className="role-card-item">
                <div className="property">Имеется</div>
                <div className="value">{actualCount}</div>
            </div>
            <div className="role-card-item">
                <div className="property">Укомпектованность</div>
                <div className="value">{percent}</div>
            </div>
        </div>
    );
};
