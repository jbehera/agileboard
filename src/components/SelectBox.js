import React, { PureComponent } from 'react';

class SelectBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            previousValue: ''
        };
    }

    onClick = (e) => {
        const previousValue = e.target.value;
        this.setState({ previousValue });
    }

    onChange = (e) => {
        this.props.onChange(e.target.value, this.state.previousValue);
    }

    render() {
        const { options, selectedValue, onChange } = this.props;
        return (
            <select onChange={this.onChange} onFocus={this.onClick} value={selectedValue}>
                {options.map((option, i) => (<option 
                    key={option} 
                    value={option}>
                    {option}
                </option>))}
            </select>            
        )
    }
}

export default SelectBox;