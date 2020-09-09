import React from "react";

/**
 * Шапка страницы.
 *
 * @param {string} title Заголовок.
 * @param {[JSX.Element]} labels Массив лейблов.
 * @param {JSX.Element} backlink Кнопка назад.
 */
export const PageHeader = ({title, labels, backlink}) => {
    return (
        <>
            {backlink && (
                <div className="backlink">{backlink}</div>
            )}
            <div className="page-header">
                <div className="page-header-title">{title}</div>
                {labels && labels.map((labelComponent, index) => {
                    return <div key={index} className="page-header-label">{labelComponent}</div>;
                })}
            </div>
        </>
    );
};
