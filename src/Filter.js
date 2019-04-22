import React from "react";
import {
    Card,
    CardActions,
    FormControl,
    MenuItem,
    Select,
} from "@material-ui/core";

export default class Filter extends  React.Component {

    state = {
        category: '',
        price: '',
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => {
            this.props.updateFilter(this.state);
        });
    };

    render() {

        let categoryOptions = this.props.categories.map((category) =>
            <MenuItem value={category} key={category}>{category}</MenuItem>
        );

        return (
            <Card className={"filter-form"}>
                <CardActions>
                    <form>
                        <FormControl>
                            <Select onChange={this.handleChange} displayEmpty={true} value={this.state.category} name={"category"} className={"filter-select"}>
                                <MenuItem value={""}>Any Category</MenuItem>
                                {categoryOptions}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <Select onChange={this.handleChange} displayEmpty={true} value={this.state.price} name={"price"} className={"filter-select"}>
                                <MenuItem value={""}>All Prices</MenuItem>
                                <MenuItem value={1}>$0 - $99</MenuItem>
                                <MenuItem value={2}>$99 - $250</MenuItem>
                                <MenuItem value={3}>$250 - $500</MenuItem>
                                <MenuItem value={4}>Over $500</MenuItem>
                            </Select>
                        </FormControl>

                    </form>
                </CardActions>
            </Card>
        )
    }
}
