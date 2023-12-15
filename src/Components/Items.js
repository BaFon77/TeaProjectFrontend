import React, {Component} from 'react';

export class Items extends Component {
    render() {
        return (
            <div>
                {
                    this.props.items.map(el => (
                        <h1>{el.name}</h1>
                    ))
                }
            </div>
        );
    }
}

export default Items;