import Inferno from 'inferno';
import Component from 'inferno-component';

import './Draggable.css';

let currentTarget;

class Draggable extends Component {
    componentDidMount() {
        if (!this.listenersAdded) {
            this.node.addEventListener('dragstart', this.handleDragStart.bind(this), false);
            this.node.addEventListener('dragover', this.handleDragOver.bind(this), false);
            this.node.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
            this.node.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
            this.node.addEventListener('dragend', this.handleDragEnd.bind(this), false);
            this.node.addEventListener('drop', this.handleDrop.bind(this), false);

            this.listenersAdded = true;
        }
    }

    getDraggable(node) {
        let child;

        for (let target = node; !target.classList.contains('dnd-sorter'); target = target.parentNode) {
            if (target.parentNode.classList.contains('dnd-sorter')) {
                return {
                    draggable: target,
                    child,
                };
            }

            child = target;
        }

        return {};
    }

    removeCurrentTargetOutline() {
        const target = document.querySelector(`[dndkey="${currentTarget}"] .draggable--over`);
        if (target) target.classList.remove('draggable--over');
    }

    handleDragStart(e) {
        currentTarget = e.target.getAttribute('dndkey');

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('text', e.target.getAttribute('dndkey'));

        if (typeof this.props.onDragStart === 'function') this.props.onDragStart(e);
    }

    handleDragOver(e) {
        if (e.preventDefault) e.preventDefault();

        e.dataTransfer.dropEffect = 'move';

        if (typeof this.props.onDragOver === 'function') this.props.onDragOver(e);
    }

    handleDragEnter(e) {
        const { draggable, child } = this.getDraggable(e.target);
        if (draggable === undefined) return;

        if (currentTarget !== draggable.getAttribute('dndkey')) {
            this.removeCurrentTargetOutline();
            currentTarget = draggable.getAttribute('dndkey');
        }

        child.classList.add('draggable--over');

        if (typeof this.props.onDragEnter === 'function') this.props.onDragEnter(e);
    }

    handleDragLeave(e) {
        if (typeof this.props.onDragLeave === 'function') this.props.onDragLeave(e);
    }

    handleDragEnd(e) {
        this.removeCurrentTargetOutline();

        if (typeof this.props.onDragEnd === 'function') this.props.onDragEnd(e);
    }

    handleDrop(e) {
        e.stopPropagation();

        const { draggable, child } = this.getDraggable(e.target);
        if (draggable === undefined) return;

        child.classList.remove('draggable--over');

        const source = e.dataTransfer.getData('text');
        this.props.handleDrop(source, draggable.getAttribute('dndkey'));

        if (typeof this.props.onDrop === 'function') this.props.onDrop(e);
    }

    render() {
        return (
            <div
                dndkey={this.props.dndkey}
                className='draggable'
                draggable='true'
                ref={(node) => { this.node = node; }}
            >
                { this.props.children }
            </div>
        );
    }
}

export default Draggable;
