import Inferno from 'inferno';
import Component from 'inferno-component';

import Draggable from './Draggable';

const dndKey = vnode => `dnd-${vnode.key}`;

class DnDSorter extends Component {
    constructor(props) {
        super(props);

        this.swapChildren = this.swapChildren.bind(this);

        this.state = {
            sortedKeys: this.sortKeys(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.sortedKeys.length !== nextProps.children.length) {
            this.setState({
                sortedKeys: this.sortKeys(nextProps),
            });
        }
    }

    sortKeys(props) {
        const keys = this.state ? this.state.sortedKeys : [];

        // Find the newly-added children.
        const added = props.children.filter(c => keys.indexOf(dndKey(c)) === -1);

        // The new order of children's keys.
        const sortedKeys = [
            ...keys,
            ...(added.map(c => dndKey(c))),
        ];

        return sortedKeys;
    }

    swapChildren(source, target) {
        const sourceRibbonIndex = this.state.sortedKeys.indexOf(source);
        if (sourceRibbonIndex === -1) return;

        const targetRibbonIndex = this.state.sortedKeys.indexOf(target);
        if (targetRibbonIndex === -1) return;

        const sortedKeys = [...this.state.sortedKeys];
        sortedKeys[sourceRibbonIndex] = target;
        sortedKeys[targetRibbonIndex] = source;

        this.setState({ sortedKeys });
    }

    render() {
        const {
            NodeType,
            className,
            onDragStart,
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDragEnd,
            onDrop,
            ...rest
        } = this.props;

        // Map to the original children.
        const sortedChildren = this.state.sortedKeys.map((id) => {
            const child = this.props.children.find(c => dndKey(c) === id);
            if (child === undefined) return undefined;

            return (
                <Draggable
                    dndkey={dndKey(child)}
                    handleDrop={this.swapChildren}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragEnd={onDragEnd}
                    onDrop={onDrop}
                >
                    {child}
                </Draggable>
            );
        }).filter(c => c !== undefined);

        return (
            <NodeType className={`dnd-sorter ${className}`} {...rest}>
                { sortedChildren }
            </NodeType>
        );
    }
}

DnDSorter.defaultProps = {
    NodeType: (<div />).type,
    className: '',
};

export default DnDSorter;
