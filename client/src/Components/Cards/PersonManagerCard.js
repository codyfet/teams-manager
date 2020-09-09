import React from "react";
import {Image} from "semantic-ui-react";
import "react-rangeslider/lib/index.css";

/**
 * Мини-карточка руководителя команды.
 *
 * @param {string} name Имя руководителя.
 */
export const PersonManagerCard = ({name}) => {
    return (
        <div className="card person-card">
            <div><Image circular src='https://react.semantic-ui.com/images/avatar/small/matthew.png' /></div>
            <div className="name">{name}</div>
            <div className="role">Руководитель команды</div>
        </div>
    );
};
