import React from "react";
import {Label} from "semantic-ui-react";

/**
 * Лейбл с указанием типа команды.
 *
 * @param {string} type Тип команды.
 */
export const TypeLabel = ({type}) => {
    let color;
    let text;

    switch (type) {
        case "PRODUCT":
            color = "olive";
            text = "Продуктовая";
            break;
        case "PROJECT":
            color = "yellow";
            text = "Проектная";
            break;
        case "SERVICE":
            color = "purple";
            text = "Сервисная";
            break;
        case "DEVOPS":
            color = "teal";
            text = "Девопс";
            break;
        case "SUPPORT":
            color = "green";
            text = "Поддержка";
            break;
    }
    return (
        <Label circular color={color}>
            {text}
        </Label>
    );
};
