import React , {Fragment, useState} from 'react';
import { prices } from './FixedPrices';

export const RadioBox = ({prices, handleFilters})=> {
    const [value, setValue] = useState([]);

    const handleChange = event => {
        let priceValues=[];

        for(let key in prices){
            if(prices[key]._id === parseInt(event.target.value)){
                priceValues = prices[key].array;
            }
        }

        handleFilters(priceValues);
        setValue(priceValues);
    }

    return prices.map((p, i) => (
        <div key={i}>
            <input  
                onChange={handleChange} 
                value={`${p._id}`}
                name={p}
                type="radio" 
                className='mr-2 ml-4'
            />
            <label className='form-check-label'>
                {p.name}
            </label>
        </div>
    ));
}