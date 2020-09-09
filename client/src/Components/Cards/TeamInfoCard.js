import React, {useState} from "react";
import {Cell, Pie, PieChart} from "recharts";
import {Button, Icon, Modal} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {updateTeam} from "../../Actions/Actions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {TEAM_TYPES} from "../../Consts";

const getTypeText = (type) => {
    let text;

    switch(type) {
        case "PRODUCT":
            text = "Продуктовая";
            break;
        case "PROJECT":
            text = "Проектная";
            break;
        case "SERVICE":
            text = "Сервисная";
            break;
        case "DEVOPS":
            text = "Девопс";
            break;
        case "SUPPORT":
            text = "Поддержка";
            break;
        default:
            text = "Не указано";
    }

    return text;
};

/**
 * Карточка с информацией о команде..
 */
export const TeamInfoCard = ({percent, team}) => {
    const dispatch = useDispatch();
    const [showEditTypeModal, setShowEditTypeModal] = useState(false);
    const [updatedType, setUpdatedType] = useState(null);

    const data = [
        {name: "Group A", value: 100 - percent},
        {name: "Group B", value: percent}
    ];
    const COLORS = ["gray", "#FFBD4D"];

    const handleEditClick = () => {
        setShowEditTypeModal(true);
    };

    return (
        <div className="card double-sized team-info-card">
            <div>
                <PieChart width={170} height={140}>
                    <Pie
                        data={data}
                        cx={75}
                        cy={65}
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                </PieChart>
            </div>
            <div>
                <div className="property-wrapper">
                    <div className="property">
                        Укомплектованность
                    </div>
                    <div className="value">
                        {percent}%
                    </div>
                </div>
                <div className="property-wrapper">
                    <div className="property">
                        Тип команды
                    </div>
                    <div className="value">
                        {getTypeText(team.type)} <Icon title="Изменить тип" className="edit-icon" onClick={handleEditClick} name='edit' size="small" />
                    </div>
                </div>
                <div className="chart-legend">
                    <div className="chart-marker orange"></div>
                    <div>Занятые позиции</div>
                    <div className="chart-marker gray"></div>
                    <div>Свободные позиции</div>
                </div>
            </div>
            {showEditTypeModal && (
                <Modal
                    size="mini"
                    open
                    onClose={() => setShowEditTypeModal(false)}
                >
                    <Modal.Header>Изменение типа команды</Modal.Header>
                    <Modal.Content>
                        <Select
                            components={makeAnimated()}
                            options={TEAM_TYPES}
                            placeholder="Выберите тип команды"
                            onChange={(value) => {setUpdatedType(value.value);}}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                    <Button negative onClick={() => setShowEditTypeModal(false)}>
                        Отмена
                    </Button>
                    <Button positive onClick={() => {
                        setShowEditTypeModal(false);
                        dispatch(updateTeam({...team, type: updatedType}));
                    }}>
                        Сохранить
                    </Button>
                    </Modal.Actions>
                </Modal>
            )}
        </div>
    );
};
