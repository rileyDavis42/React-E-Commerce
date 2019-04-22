import React from "react";
import {CircularProgress, Typography} from "@material-ui/core";
import CheckCirlceIcon from '@material-ui/icons/CheckCircleOutline';

export default class Checkout extends React.Component {

    state = {
        isLoaded: false,
    };

    render() {
        setTimeout(() => {
            this.setState({isLoaded: true});
            this.props.clearCart();
        }, 3000);

        if (!this.state.isLoaded) {
            return (
                <div>
                    <CircularProgress className={"spinner"} size={60} />
                </div>
            )
        } else {
            return (
                <div>
                    <Typography variant={"title"}>
                        Checkout complete!
                    </Typography>
                    <div className={"checkout-complete"}>
                        <CheckCirlceIcon className={"icon-cover"} />
                    </div>
                    <Typography variant={"subheading"}>
                        Thanks for shopping with us!
                    </Typography>
                </div>
            )
        }
    }
}
