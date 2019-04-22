import React from 'react';
import {Button, Card, CardContent, CardMedia, Chip, Divider, Typography} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Ratings from 'react-ratings-declarative';

export default class ProductDetail extends React.Component {

    selectedItem = {};

    sort = () => {
        this.props.updateFilter({category: this.selectedItem.category});
    };

    handleAddToCart = () => {
        this.props.addToCart(this.selectedItem);
        this.props.alert(this.selectedItem.title + " has been added to cart");
    };

    render() {
        let url = window.location.href.split("/");
        let itemID = Number(url[url.length - 1]);
        let items = this.props.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i]['id'] === itemID) {
                this.selectedItem = items[i];
            }
        }

        let selectedItem = this.selectedItem;

        return (
            <Card className={"card-detail"}>
                <CardMedia component={"img"} image={selectedItem.img} />
                <CardContent className={"description"}>
                    <Typography variant={"h4"} color={"primary"}>{selectedItem.title} </Typography>
                    <Divider variant={"inset"}/>
                    <Typography className={"paragraph"} variant={"subtitle1"}>  {selectedItem.description} </Typography>

                    <div className={"paragraph"}>
                        <Ratings rating={selectedItem['rating']} typeOfWidget={"Star"} widgetDimensions={"30px"} >
                            <Ratings.Widget widgetRatedColor={"yellow"} />
                            <Ratings.Widget widgetRatedColor={"yellow"} />
                            <Ratings.Widget widgetRatedColor={"yellow"} />
                            <Ratings.Widget widgetRatedColor={"yellow"} />
                            <Ratings.Widget widgetRatedColor={"yellow"} />
                        </Ratings>
                        <Typography variant={"h6"}> {selectedItem['rating']} </Typography>
                        <Chip label={selectedItem['category']} color={"primary"} onClick={this.sort}/>
                    </div>
                    <CardActions>
                        <Button variant="outlined" color="secondary" className={"price-tag"}>
                            {selectedItem['price']}
                        </Button>
                        <Button size={"small"} color={"primary"} onClick={this.handleAddToCart}>Add To Cart</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
}
