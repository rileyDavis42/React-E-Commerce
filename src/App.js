import React, {Component} from 'react';
import './App.css';
import Route from './Router';
import Header from './Header';
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Item from "./Item";
import CircularProgress from '@material-ui/core/CircularProgress';
import Filter from "./Filter";
import {Card, Snackbar} from "@material-ui/core";

class App extends Component {

    state = {
        items: [],
        loaded: false,
        cart: [],
        snackbar: false,
        snackbarMessage: 'Item Added',
        filter: {
            category: '',
            price: 0,
        }
    };

    priceFilters = [
        {"from": 0, "to": 0},
        {"from": 0, "to": 99},
        {"from": 99, "to": 250},
        {"from": 250, "to": 500},
        {"from": 500, "to": 9000}
    ];

    alert = (message) => {
        this.setState({snackbar: true, snackbarMessage: message});
    };

    filter = (item: Object) => {
        let pass = true;
        let filter = this.state.filter;
        if (filter.category && filter.category !== "") {
            pass = (filter.category === item.category);
        }

        if (pass && filter.price && filter.price !== 0) {
            pass = (item.price >= this.priceFilters[filter.price]['from'] && item.price <= this.priceFilters[filter.price]['to']);
        }
        return pass;
    };

    updateFilter = (newFilter: Object) => {
        this.setState({filter: newFilter});
    };

    addToCart = (item: Object) => {
        let newCart = this.state.cart;
        newCart.push(item);

        this.setState({cart: newCart}, () => {
            sessionStorage.setItem("cart", JSON.stringify(newCart));
        });
    };

    removeFromCart = (itemID: number) => {
        let newCart = this.state.cart;
        for (let i = 0; i < newCart.length; i++) {
            if (newCart[i]['id'] === itemID) {
                newCart.splice(i, 1);
                this.setState({cart: newCart}, () => {
                    sessionStorage.setItem("cart", JSON.stringify(newCart));
                });
                return;
            }
        }
    };

    clearCart = () => {
        sessionStorage.clear();
        this.setState({cart: []});
    };

    componentDidMount() {

        let sessionCart = JSON.parse(sessionStorage.getItem('cart'));
        if (sessionCart) {
            this.setState({cart: sessionCart});
            sessionCart = undefined;
        }


        fetch("https://my-json-server.typicode.com/tdmichaelis/json-api/products")
            .then(response => response.json())
            .then((data) => {
                this.setState({items: data});
                fetch("https://my-json-server.typicode.com/tdmichaelis/typicode/categories")
                    .then(response => response.json())
                    .then((data) => {
                        this.setState({categories: data, loaded: true})
                    });
            });
    }

    render() {

        if (!this.state.loaded) {
            return (
                <div className={"App"}>
                    <Header />
                    <CircularProgress className={"spinner"} size={80}/>
                </div>
            )
        }
        else {
            let listItems = this.state.items.map((item) => {
                    if (this.filter(item)) { // If it passes the filter
                        return <Item className={"item"} item={item} key={item.id} addToCart={this.addToCart} alert={this.alert} />
                    }
                }
            );

            for (let i = 0; i < (3 - listItems.length % 3); i ++) {
                listItems.push(
                    <div key={"filler_" + i} className={"card-wrapper"} >
                        <div className={"card"}/>
                    </div>
                );
            }

            return (
                <div className="App">
                    <Header cart={this.state.cart.length} />
                    <Route path={"/detail"} component={ProductDetail} props={{items: this.state.items, updateFilter: this.updateFilter, addToCart: this.addToCart, alert: this.alert}} />
                    <Route path={"/cart"} component={Cart} props={{items: this.state.cart, removeFromCart: this.removeFromCart, clearCart: this.clearCart }} />
                    <Filter categories={this.state.categories} updateFilter={this.updateFilter} />
                    <div className={"card-container"}>
                        {listItems}
                    </div>

                    <Snackbar
                        open={this.state.snackbar}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={() => this.setState({snackbar: false})}
                        autoHideDuration={3000}
                        message={<span>{this.state.snackbarMessage}</span>}
                    />
                </div>
            );
        }
    }
}

export default App;
