import React from "react";
import {Label} from "semantic-ui-react";

/**
 * Лейбл с указанием статусов команды.
 *
 * @param {string} status Статус команды.
 */
export const StatusLabel = ({status}) => {
    let color;
    let text;

    switch (status) {
        case "ACTIVE":
            color = "orange";
            text = "Активная";
            break;
        case "CLOSED":
            color = "red";
            text = "Закрытая";
            break;
        case "NEW":
            color = "gray";
            text = "Новая";
            break;
    }
    return (
        <Label circular color={color}>
            {text}
        </Label>
    );
};
