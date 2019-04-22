import React from "react";
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import {FormControl, MenuItem, Select, TextField} from "@material-ui/core";

export default class PurchaseForm extends React.Component {

    state = {
        expirationMonth: '',
        expirationYear: '',
    };

    handleDateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <form class="checkout-form-wrapper">
                <div className={"checkout-form"}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TextField inputProps={{maxlength: 16}} required label={"Card Number"}
                                   placeholder={"XXXX-XXXX-XXXX-XXXX"}> </TextField>
                        {/*<DatePicker format={'mm-dd'} value={this.state.expirationDate} onChange={this.handleDateChange} />*/}
                    </MuiPickersUtilsProvider>
                </div>

                <div className={"checkout-form"}>
                    <FormControl required>
                        <Select onChange={this.handleDateChange} name={"expirationMonth"}
                                displayEmpty={true} value={this.state.expirationMonth}>
                            <MenuItem value={""} disabled>MM</MenuItem>
                            <MenuItem value={"01"}>01</MenuItem>
                            <MenuItem value={"02"}>02</MenuItem>
                            <MenuItem value={"03"}>03</MenuItem>
                            <MenuItem value={"04"}>04</MenuItem>
                            <MenuItem value={"05"}>05</MenuItem>
                            <MenuItem value={"06"}>06</MenuItem>
                            <MenuItem value={"07"}>07</MenuItem>
                            <MenuItem value={"08"}>08</MenuItem>
                            <MenuItem value={"09"}>09</MenuItem>
                            <MenuItem value={"10"}>10</MenuItem>
                            <MenuItem value={"11"}>11</MenuItem>
                            <MenuItem value={"12"}>12</MenuItem>
                        </Select>
                    </FormControl>
                    <span> / </span>
                    <FormControl required>
                        <Select onChange={this.handleDateChange} name={"expirationYear"} displayEmpty={true}
                                value={this.state.expirationYear}>
                            <MenuItem value={""} disabled>YY</MenuItem>
                            <MenuItem value={"2019"}>2019</MenuItem>
                            <MenuItem value={"2020"}>2020</MenuItem>
                            <MenuItem value={"2021"}>2021</MenuItem>
                            <MenuItem value={"2022"}>2022</MenuItem>
                            <MenuItem value={"2023"}>2023</MenuItem>
                            <MenuItem value={"2024"}>2024</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className={"checkout-form"}>

                    <TextField className={"input-security-code"} type={"text"} inputProps={{maxlength: 3}}
                               InputLabelProps={{shrink: true}} required label={"Security Code"}
                               placeholder={"XXX"}> </TextField>
                </div>
            </form>
        );
    }
}
