import React from "react";
import {Container} from "semantic-ui-react";
import {PageHeader} from "../Components/PageHeader";
import {PersonCard} from "../Components/Cards/PersonCard";
import {PersonManagerCard} from "../Components/Cards/PersonManagerCard";
import {RoleCard} from "../Components/Cards/RoleCard";
import {EmptyCard} from "../Components/Cards/EmptyCard";
import {TeamInfoCard} from "../Components/Cards/TeamInfoCard";
import {TypeLabel} from "../Components/Labels/TypeLabel";
import {StatusLabel} from "../Components/Labels/StatusLabel";
import {Link, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {calculateActualTeamCapacity} from "../Utils/Utils";

/**
 * Страница просмотра детальной информации о команде.
 */
export const Team = () => {
    let {id} = useParams();
    const history = useHistory();
    const teams = useSelector(state => state.teams.data);
    const team  = teams.find((team) => team.id === parseInt(id));

    return (
        <Container className="layout team-page">
            <PageHeader
                title={team.title}
                labels={[
                    <StatusLabel key={team.status} status={team.status} />,
                    <TypeLabel key={team.type} type={team.type}/>
                ]}
                backlink={<Link className="link-to-teams" to="/teams" key="teams">&lt; Вернуться к командам</Link>}
            />

            <div className="card-panel">
                <PersonManagerCard name={team.manager} />
                <TeamInfoCard percent={calculateActualTeamCapacity(team)} team={team} />
            </div>

            {team.positions.map((position) => {
                /**
                 * Складываем суммарную загрузку всех сотрудников для данной позиции.
                 */
                const sumByLoads = position.positionLoads.reduce(
                    (acc, currValue) => acc + currValue.chargePercent, 0
                );

                return (
                    <div key={position.id}>
                        <div className="role-title">{position.info?.role}</div>
                        <div className="card-panel">
                            <RoleCard
                                capacityCount={position.capacity}
                                actualCount={position.positionLoads.length}
                                percent={`${parseInt(sumByLoads / position.capacity)}%`}
                            />
                            {position.positionLoads.map((positionLoad) => {
                                return (
                                    <PersonCard
                                        key={positionLoad.id}
                                        positionLoad={positionLoad}
                                    />
                                );
                            })}
                            <EmptyCard onClick={() => {
                                history.push(`/persons?teamId=${team.id}`);
                            }}/>
                        </div>
                    </div>
                );
            })}
        </Container>
    );
};
