import React, { useEffect, useState } from 'react';
import { get_items } from '../services/api';

const Items = (props) => {
    const [dataItems, setDataItems] = useState([]);

    const items = () => {
        if(props.cookies.BearerToken) {
            get_items(props.cookies.BearerToken.token).then((values) => {
                setDataItems(values);
            })
        }
    }

    useEffect(() => {
        items();
    }, [dataItems]);

    if(props.cookies.BearerToken) {
        return (
            <div className='ItemsList' style={{marginLeft: 50, marginTop: 20}}>
                <div style={{fontSize: 30}}>Liste des Items</div>
                <ul>
                    {dataItems.map((prop, key) => {
                        return (
                            <li key={key}>{prop.name}</li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        return (
            <div style={{marginLeft: 50, marginTop: 20}}>
                <div style={{fontSize: 30}}>Merci de vous connecter afin d'afficher les items.</div>
            </div>
        )
    }
}

export default Items;