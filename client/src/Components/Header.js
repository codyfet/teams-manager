import React from "react";
import {Container, Menu} from "semantic-ui-react";

/**
 * Компонент шапка-приложения.
 */
export const Header = () => {
    return (
        <Menu borderless>
            <Container>
                <Menu.Item key="demouser" position="right">
                    DemoUser
                </Menu.Item>
            </Container>
        </Menu>
    );
};