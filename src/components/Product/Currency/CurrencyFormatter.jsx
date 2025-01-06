import React from "react";
import numeral, { Numeral } from "numeral";

const CurrencyFormatter=({amount})=>{
        const formatted=numeral(amount).format("$0,0.00")
        return <div>{formatted}</div>
}
export default CurrencyFormatter;