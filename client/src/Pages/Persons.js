import React, {useEffect, useState} from "react";
import {Button, Container, Grid, Icon, Input, Segment, Table} from "semantic-ui-react";
import {PersonSidebar} from "../Components/PersonSidebar";
import {PageHeader} from "../Components/PageHeader";
import {useHistory} from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees} from "../Actions/Actions";
import {LoadingOverlay} from "../Components/Common/LoadingOverlay";

// const PERSONS = [
//     {
//         id: 1111,
//         name: "Павлов Максим Иванович",
//         owner: "Иванов Иван Иванович",
//         level: "Старший разработчик",
//         department: "ИТ Отдел",
//         chargeability: 110,
//         number: "123243"
//     },
//     {
//         id: 2222,
//         name: "Фролов Сергей Иванович",
//         owner: "Иванов Иван Иванович",
//         level: "Разработчик",
//         department: "ИТ Отдел",
//         chargeability: 50,
//         number: "2243324"
//     },
// ];

const PERSON_LEVELS = [
    {value: "developer", label: "Разработчик"},
    {value: "middleDeveloper", label: "Старший разработчик"},
    {value: "seniorDevelope", label: "Ведущий разработчик"},
    {value: "teamLead", label: "Тимлид"},
    {value: "manager", label: "Менеджер"},
];

const PERSON_DEPARTMENTS = [
    {value: "it", label: "ИТ Отдел"},
    {value: "bookkeeping", label: "Бухгалтерия"},
    {value: "ml", label: "Отдел машинного обучения"},
];

/**
 * Списковая форма Сотрудники.
 */
export const Persons = () => {
    const [filterPanelIsVisible, setFilterPanelIsVisible] = useState(false);
    const [showPersonModal, setShowPersonModal] = useState(false);
    const history = useHistory();
    const animatedComponents = makeAnimated();
    const dispatch = useDispatch();
    const {data, isLoading} = useSelector(state => state.employees);
    const employees = data;

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    return (
        !employees || isLoading ? (
            <LoadingOverlay />
        ) : (
            <Container className="layout persons-page">
                <PageHeader
                    title="Добавление сотрудника"
                    backlink={<a className="a-link" onClick={() => {history.goBack();}}>&lt; Вернуться к команде</a>}
                />
                <div>
                    <Button className="filter-button" onClick={() => {setFilterPanelIsVisible(!filterPanelIsVisible);}}>
                        <Icon name='filter' />Фильтры&nbsp;&nbsp;<Icon name={`${filterPanelIsVisible ? "chevron down" : "chevron up"}`} />
                    </Button>
                </div>
                {filterPanelIsVisible && (
                    <Segment>
                        <div className="filter-header">Фильтры</div>
                        <Grid>
                            <Grid.Column width={4}>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={PERSON_LEVELS}
                                    placeholder="Выберите должность"
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={PERSON_DEPARTMENTS}
                                    placeholder="Выберите подразделение"
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Input icon='search' placeholder='Введите ФИО' />
                            </Grid.Column>
                            <Grid.Column width={4} textAlign="right">
                                <Button>Применить</Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                )}

                <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                            <Table.HeaderCell width={3}>ФИО</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Таб. номер</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Руководитель</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Подразделение</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Специализация</Table.HeaderCell>
                            <Table.HeaderCell width={2}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {employees.map((item, index) => {
                            return (
                                <Table.Row key={item.id}>
                                    <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                                    <Table.Cell>{item.fio}</Table.Cell>
                                    <Table.Cell>{item.number}</Table.Cell>
                                    <Table.Cell>{item.manager}</Table.Cell>
                                    <Table.Cell>{item.department}</Table.Cell>
                                    <Table.Cell>{item.spec}</Table.Cell>
                                    <Table.Cell textAlign="right"><a className="a-link" onClick={() => {setShowPersonModal(true);}}>Настроить</a></Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                {showPersonModal && <PersonSidebar person={employees[0]} setShowPersonModal={setShowPersonModal} />}
            </Container>
        )
    );
};
