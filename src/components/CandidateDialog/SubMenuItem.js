// https://github.com/mui-org/material-ui/issues/11723
import React from "react";
import PropTypes from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from '@material-ui/core/Menu';
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  subMenuItem: {
    display: "flex",
    justifyContent: "space-between"
  }
};

class SubMenuItem extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            anchorElement: null,
        };

        this.handleItemClick = this.handleItemClick.bind(this);
  }

    handleItemClick(event) {
        if (!this.state.anchorElement) {
            this.setState({ anchorElement: event.currentTarget });
        }
        this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
    }

    render() {
        const { caption, menuItems, classes } = this.props;

        const subItems = menuItems.map(menuItem => (
            <MenuItem
                value={`${caption} / ${menuItem}`}
                key={menuItem}
                onClick={() => {
                    this.props.handleChange(`${caption} / ${menuItem}`);
                    this.setState({ menuOpen: false });
                }}
            >
                {menuItem}
            </MenuItem>
        ));

        return (
        <React.Fragment>
            <MenuItem
                onClick={this.handleItemClick}
                className={classes.subMenuItem}
            >
                {caption}
                <ArrowRightIcon />
            </MenuItem>
            
            <Menu
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                open={this.state.menuOpen}
                anchorEl={this.state.anchorElement}
                onClose={() => { this.setState({ menuOpen: false }) }}
            >
                {subItems}
            </Menu>
        </React.Fragment>
        );
    }
}

SubMenuItem.propTypes = {
  caption: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired
};

export default withStyles(styles)(SubMenuItem);
