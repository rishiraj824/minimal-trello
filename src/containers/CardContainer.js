import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Card from '../components/Card';
import {connect} from 'react-redux';

const CardContainer = ({card, onDroppedCard, onCardTitleChanged, onRemoveCard}) => {
    return <Card id={card.id} title={card.title} removeCard={onRemoveCard} onDropped={onDroppedCard} onTitleChanged={onCardTitleChanged}/>;
};

CardContainer.propTypes = {
    card: PropTypes.object,
    onDroppedCard: PropTypes.func,
    onRemoveCard: PropTypes.func,
    onCardTitleChanged: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cards[ownProps.id]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDroppedCard: (cardId, listId) => dispatch(actions.moveCard(cardId, listId)),
        onCardTitleChanged: (cardId, newTitle) => dispatch(actions.changeCard(cardId, newTitle)),
        onRemoveCard: (cardId, listId) => dispatch(actions.removeCard(cardId, listId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardContainer);
