import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import {Badge, Button, CardActionArea, CardMedia, Typography} from "@material-ui/core";

export default class Item extends React.Component {

    handleAddToCart = () => {
        this.props.alert( this.props.item.title + " has been added to cart");
        this.props.addToCart(this.props.item);
    };

    render() {
        return (
            <div className={"card-wrapper"}>
                <Badge badgeContent={this.props.item.rating} color={"primary"}>
                    <Card className={"card"}>
                        <a href={"/detail/" + this.props.item.id}>
                            <CardActionArea className={"card-content"}>
                                <CardMedia
                                    component={"img"}
                                    image={this.props.item.img}/>
                                <CardContent>
                                    <Typography color={"primary"} variant={"subtitle2"}>
                                        {this.props.item.title}
                                    </Typography>
                                    <Typography className={"paragraph"} variant={"body1"} color={"textPrimary"}>
                                        {this.props.item.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </a>
                        <CardActions>
                            <Button variant="outlined" color="secondary" className={"price-tag"}>
                                {this.props.item.price}
                            </Button>
                            <Button size={"small"} color={"primary"} onClick={this.handleAddToCart}>Add To Cart</Button>
                        </CardActions>
                    </Card>
                </Badge>
            </div>
        )
    }
}
