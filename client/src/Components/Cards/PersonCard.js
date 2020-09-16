import React, {useState} from "react";
import {Icon, Image} from "semantic-ui-react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import {useDispatch} from "react-redux";
import {deletePositionLoad} from "../../Actions/Actions";

/**
 * Мини-карточка сотрудника.
 *
 * @param {Object} positionLoad Объект загрузки (включает модель сотрудника и его показатель загрузки) для позиции.
 */
export const PersonCard = ({positionId, positionLoad}) => {
    const [rangeValue, setRangeValue] = useState(positionLoad.chargePercent);
    const dispatch = useDispatch();

    /**
     * Обработчик изменения диапазона загрузки сотрудника.
     *
     * @param {number} value Новое значение.
     */
    const handleRangeChange = (value) => {
        setRangeValue(value);
    };

    /**
     * Обработчик завершения процесса изменения диапазона загрузки сотрудника.
     *
     * @param {number} value Новое значение.
     */
    const handleRangeCompleteChange = (value) => {

    };

    /**
     * Обработчик нажатия на кнопку Удалить.
     *
     * @param {number} value Новое значение.
     */
    const handleRemoveClick = () => {
        dispatch(deletePositionLoad(positionId, positionLoad.id));
    };

    return (
        <div className="card person-card">
            <Icon
                onClick={handleRemoveClick}
                className="close-button"
                name='close'
            />
            <div><Image circular src='https://react.semantic-ui.com/images/avatar/small/matthew.png' /></div>
            <div className="name">{positionLoad.employee.fio}</div>
            <div className="role">{positionLoad.employee.position}</div>
            <div className="chargeability-range">
                <span className="percent-value">{rangeValue}%</span>
                <Slider
                    className={`chargeability-range-input ${rangeValue <= 33 ? "green" : rangeValue <= 77 ? "orange" : "red"}`}
                    value={rangeValue}
                    orientation="horizontal"
                    onChange={handleRangeChange}
                    onCompleteChange={handleRangeCompleteChange}
                />
            </div>
        </div>
    );
};
