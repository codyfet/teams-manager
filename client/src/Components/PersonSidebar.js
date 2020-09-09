import React, {useState} from "react";
import Sidebar from "react-sidebar";
import Slider from "react-rangeslider";
import {Button, Grid, Icon, Image} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

/**
 * Сайдбар-панель, открывающаяся при добавлении сотрудника на позицию.
 *
 * @param {Object} person Сотрудник.
 * @param {Function} setShowPersonModal Колбэк, закрывающий/открывающий сайдбар.
 */
export const PersonSidebar = ({person, setShowPersonModal}) => {
    const history = useHistory();
    const chargeability = 100; // TODO: Убрать хардкод.
    const [rangeValue, setRangeValue] = useState(chargeability);

    /**
     * Обработчик изменения диапазона загрузки сотрудника.
     *
     * @param {number} value Новое значение.
     */
    const handleRangeChange = (value) => {
        setRangeValue(value);
    };

    return (
        <Sidebar
            sidebar={
                <div className="person-sidebar">
                    <Button className="close-sidebar" onClick={() => setShowPersonModal(false)} icon='close' />
                    <div className="section">
                        <Image width={96} height={96} circular src='https://react.semantic-ui.com/images/avatar/small/matthew.png' />
                        <div className="name">{person.fio} <Button className="add-person-button" onClick={() => {history.push("/team/9");}}><Icon name='plus' />Добавить</Button></div>
                        <div className="label-text">{person.position}</div>
                    </div>
                    <div className="section">
                        <div className="label-text">Уровень загрузки на проекте Прокопьевск</div>
                        <div className="chargeability-range">
                            <span className="percent-value">{chargeability}%</span>
                            <Slider
                                className={`chargeability-range-input sidebar-chargeability-range-input ${chargeability < 33 ? "green" : chargeability < 77 ? "orange" : "red"}`}
                                value={rangeValue}
                                orientation="horizontal"
                                onChange={handleRangeChange}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={7}>
                                    <div className="label-text">Табельный номер</div>
                                    <div className="label-value">{person.number}</div>
                                </Grid.Column>
                                <Grid.Column width={9}>
                                    <div className="label-text">ФИО Руководителя</div>
                                    <div className="label-value">{person.manager}</div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="label-text">Должность</div>
                                    <div className="label-value">{person.position}</div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="label-text">Стек технологий</div>
                                    <div className="technology-stack">
                                        <span className="technology-label">React</span>
                                        <span className="technology-label">Redux</span>
                                        <span className="technology-label">Typescript</span>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <div className="section">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={7}>
                                    <div className="label-text">Проектная занятость</div>
                                    <div className="label-value">170%</div>
                                </Grid.Column>
                                <Grid.Column width={9}>
                                    <div className="label-text">Проектов</div>
                                    <div className="label-value">8</div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            }
            open
            onSetOpen={setShowPersonModal}
            styles={{sidebar: {background: "white"}}}
        >
        </Sidebar>
    );
};
