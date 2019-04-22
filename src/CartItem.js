import React from "react";
import {
    Button,
    CardActionArea,
    CardActions,
    Divider,
    Fab,
    Typography
} from "@material-ui/core";
import Ratings from "react-ratings-declarative";
import DeleteIcon from '@material-ui/icons/Delete';

export default class CartItem extends React.Component {

    handleDelete = (id) => {
        this.props.removeFromCart(id);
    };

    render() {
        let item = this.props.item;

        return (
            <div>
                <div className={"cart-item"}>
                    <div className={"cart-item-image"}>
                        <img src={item.img} alt={""}/>
                    </div>
                        <CardActionArea className={"cart-item-content"} href={"/detail/" + this.props.item.id}>
                            <Typography color={"primary"} variant={"subtitle1"}>
                                {item['title']}
                            </Typography>
                            <Typography variant={"caption"} color={"textPrimary"}>
                                {item['description']}
                            </Typography>
                            <Ratings rating={item['rating']} typeOfWidget={"Star"} widgetDimensions={"20px"}>
                                <Ratings.Widget widgetRatedColor={"yellow"}/>
                                <Ratings.Widget widgetRatedColor={"yellow"}/>
                                <Ratings.Widget widgetRatedColor={"yellow"}/>
                                <Ratings.Widget widgetRatedColor={"yellow"}/>
                                <Ratings.Widget widgetRatedColor={"yellow"}/>
                            </Ratings>
                        </CardActionArea>
                    <CardActions className={"cart-item-action"}>
                        <Button variant="outlined" color="secondary" className={"price-tag"}>
                            {item['price']}
                        </Button>
                        <Fab color="secondary" onClick={() => this.handleDelete(item['id'])}>
                            <DeleteIcon />
                        </Fab>
                    </CardActions>
                </div>
                <Divider/>
            </div>
        )
    }
}
