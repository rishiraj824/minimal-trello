import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import EditableLabel from 'react-inline-editing';
import '../styles/Card.css';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // When dropped on a compatible target, do something
        const draggedCard = monitor.getItem();
        const dropList = monitor.getDropResult();
        props.onDropped(draggedCard.id, dropList.id);
    }
};

/**
 * Specifies the props to inject into your component.
 */
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

class Card extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        onDropped: PropTypes.func,
        onTitleChanged: PropTypes.func,

        // Injected by React DnD:
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
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
        const { id, title, connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div className="Card" style={{opacity: isDragging ? 0.5 : 1}}>
                <div className="Card-title">
                    <EditableLabel
                        className="Card-title-inline"
                        staticElement="div"
                        activeClassName="editing"
                        editing
                        stopPropagation
                        text={title}
                        paramName="title"
                        change={this.dataChanged}
                    />

                <a href="#" className="Cardlist-removeCard" onClick={()=>this.props.removeCard(id)}>Remove</a>
                </div>
            </div>
        );
    }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
