import {Badge, Toolbar, Typography} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import AppBar from "@material-ui/core/AppBar";
import './Header.css';
import React from "react";
import HomeIcon from "@material-ui/icons/Home";

export default class Header extends React.Component {
    render() {
        return (
            <AppBar>
                <Toolbar className={"app-toolbar"}>
                    <Typography variant={"h6"} color={"inherit"}>
                        <a href={"/"}>
                            <HomeIcon fontSize={"large"} />
                        </a>
                    </Typography>
                    <a href={"/cart"}>
                        <Badge badgeContent={this.props.cart} color={"secondary"} showZero>
                            <Icon>shopping_cart</Icon>
                        </Badge>
                    </a>
                </Toolbar>
            </AppBar>
        )
    }
}
