import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import EditableLabel from 'react-inline-editing';
import ItemTypes from '../ItemTypes';
import CardContainer from '../containers/CardContainer';
import '../styles/CardList.css';

const cardTarget = {
    drop(props) {
        return { id: props.id };
    },
};

class CardList extends React.Component  {
    static propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        onAddCard: PropTypes.func,
        cards: PropTypes.array,
        onTitleChanged: PropTypes.func,

        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.dataChanged = this.dataChanged.bind(this);
    }

    dataChanged(data) {
        this.setState({...data});
        this.props.onTitleChanged(this.props.id, data.title);
    }

    render() {
        const {title, cards, onAddCard, connectDropTarget, isOver, canDrop} = this.props;

        const isActive = canDrop && isOver;

        let backgroundColor = '#E2E4E6';
        if (isActive) {
            backgroundColor = '#8ac17c';
        } else if (canDrop) {
            backgroundColor = '#f9dd4d';
        }

        let rows = [];

        cards.forEach((c, index) => {
            rows.push(
                <CardContainer key={index} id={c.id}/>
            );
        });

        return connectDropTarget(
            <div className="CardList" style={{backgroundColor}}>
                <div className="CardList-title">
                    <EditableLabel
                        className="CardList-title-inline"
                        staticElement="div"
                        activeClassName="editing"
                        editing
                        stopPropagation
                        text={title}
                        paramName="title"
                        change={this.dataChanged}
                    />
                </div>
                { rows }
                <a href="#" className="Cardlist-addCard" onClick={onAddCard}>Add a card...</a>
            </div>
        );
    }
}

export default DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(CardList);
