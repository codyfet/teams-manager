import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Grid, Icon, Input, Segment, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {PageHeader} from "../Components/PageHeader";
import {TypeLabel} from "../Components/Labels/TypeLabel";
import {StatusLabel} from "../Components/Labels/StatusLabel";
import {getTeams} from "../Actions/Actions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {LoadingOverlay} from "../Components/Common/LoadingOverlay";
import {TEAM_STATUSES, TEAM_TYPES} from "../Consts";

/**
 * Страница списковая форма "Команды".
 */
export const Teams = () => {
    const [filterPanelIsVisible, setFilterPanelIsVisible] = useState(false);
    const {data, isLoading} = useSelector(state => state.teams);
    const teams = data;
    const dispatch = useDispatch();
    const animatedComponents = makeAnimated();

    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    return (
        !teams || isLoading ? (
            <LoadingOverlay />
        ) : (
            <Container className="layout teams-page">
                <PageHeader title="Команды" />
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
                                    options={TEAM_TYPES}
                                    placeholder="Выберите тип команды"
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={TEAM_STATUSES}
                                    placeholder="Выберите статус команды"
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
                            <Table.HeaderCell width={4}>Название</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Владелец</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Тип</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Статус</Table.HeaderCell>
                            <Table.HeaderCell width={2}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {teams.map((item, index) => {
                            return (
                                <Table.Row key={item.id}>
                                    <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                                    <Table.Cell>{item.title}</Table.Cell>
                                    <Table.Cell>{item.manager}</Table.Cell>
                                    <Table.Cell><TypeLabel type={item.type}/></Table.Cell>
                                    <Table.Cell><StatusLabel status={item.status} /></Table.Cell>
                                    <Table.Cell textAlign="right"><Link className="link-to-team" to={`/team/${item.id}`} key="person">Перейти &gt;</Link></Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Container>
        )

    );
};
