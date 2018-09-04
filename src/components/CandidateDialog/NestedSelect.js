import React,{Component} from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SubMenuItem from './SubMenuItem';

class NestedSelect extends Component {
    constructor(props){
        super(props);

        this.state = { menuOpen: false }

        this.handleSubMenuChange = this.handleSubMenuChange.bind(this);
    }

    handleSubMenuChange(val) {
        this.setState({ menuOpen: false });
        this.props.changeValue(val);
    }

    render() {
        return (
            <FormControl>
                <Select
                    value={this.props.value}
                    renderValue={() => this.props.value}
                    onChange={e => { this.props.changeValue(e.target.value) }}
                    displayEmpty
                    inputProps={{
                        name: 'applicationStatus',
                        id: 'applicationStatus-select',
                    }}
                    open={this.state.menuOpen}
                    onOpen={() => { this.setState({ menuOpen: true }) }}
                    onClose={() => { this.setState({ menuOpen: false }) }}
                >
                    <SubMenuItem
                        caption="Interview Completed"
                        menuItems={['Accepted', 'Rejected']}
                        handleChange={this.handleSubMenuChange}
                    />
                    <SubMenuItem
                        caption="Assessment Centre"
                        menuItems={['Accepted', 'Rejected']}
                        handleChange={this.handleSubMenuChange}
                    />
                    <MenuItem value="Another selection">Another selection</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

export default NestedSelect;
