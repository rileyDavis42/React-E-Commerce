import React from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent, Step, StepLabel, Stepper,
    Typography
} from "@material-ui/core";

import CartItem from "./CartItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import PurchaseForm from "./PurchaseForm";
import Checkout from "./Checkout";

export default class Cart extends React.Component {

    state = {
        step: 0,
    };

    handleDelete = (id) => {
        this.props.removeFromCart(id);
    };

    clearCart = () => {
        this.props.clearCart();
    };

    nextStep = () => {
        let step = this.state.step;
        step++;
        this.setState({step: step});
    };

    previousStep = () => {
        let step = this.state.step;
        step--;
        this.setState({step: step});
    };

    render() {

        if ((!this.props.items || this.props.items.length < 1) && this.state.step !== 2) {
            return (
                <Card className={"empty-cart"}>
                    <ShoppingCartIcon className={"icon-extra-large"}/>
                    <Typography variant={"headline"}>
                        Your cart is empty!
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        To add an item to your cart, simply browse from the many items below and select "Add To Cart" on
                        one you'd like to purchase.
                    </Typography>
                </Card>
            )
        } else {

            let totalPrice = 0;


            let items = this.props.items.map((item, index) => {
                totalPrice += item['price'];
                return (
                    <CartItem key={"cart-item-" + index} item={item} removeFromCart={this.handleDelete}/>
                );
            });

            let content = {};

            if (this.state.step === 0) {
                content = (
                    <div>
                        <CardContent>
                            {items}
                        </CardContent>
                    </div>
                );
            } else if (this.state.step === 1) {
                content = (
                    <PurchaseForm />
                )
            } else {
                content = (
                    <Checkout clearCart={this.clearCart} />
                )
            }

            return (
                <Card className={"cart"}>
                    <Stepper activeStep={this.state.step}>
                        <Step>
                            <StepLabel>Cart</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Purchasing</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Checkout</StepLabel>
                        </Step>
                    </Stepper>
                    <div className={"cart-content"}>
                        {content}
                    </div>
                    <CardActions className={"cart-action-wrapper"}>
                        <div className={"cart-action"}>
                            <Typography variant="h6">
                                Subtotal: ${totalPrice}
                            </Typography>
                            <Button color={"primary"} variant={"contained"} onClick={this.previousStep}
                                    disabled={this.state.step === 0}>Back</Button>
                            <Button color={"primary"} variant={"contained"} onClick={this.nextStep}
                                    disabled={this.state.step === 2}>{this.state.step === 0 ? 'Next' : 'Finish'}
                            </Button>

                            <Typography variant={"caption"}>
                                Estimated Delivery: 3-4 business days
                            </Typography>
                        </div>
                    </CardActions>
                </Card>
            )
        }
    }
}
