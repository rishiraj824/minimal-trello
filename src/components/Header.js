import React from 'react';
import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({onAddNewList}) => {
    return (
        <header className="Board-header">
            <h3>Minimal Trello</h3>
            <a href="#" className="button-new-list" onClick={onAddNewList}>
                <span className="icon-plus">+</span>
            </a>
        </header>
    );
};

Header.propTypes = {
    onAddNewList: PropTypes.func
};
export default Header;
