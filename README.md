# inferno-dnd-sorter
Drag-and-drop [Inferno](https://github.com/infernojs/inferno) components to rearrange them.

- Provides a sorting container component which you use such that all its children are the
  components you wish to drag and rearrange.
- Dragging a component onto another component makes them swap places.
- The draggable children **must have** keys. It's how the DnDSorter keeps track of them.
  Generally Inferno will auto-assign keys for you, but yeah, be aware.
- Some basic, trivially-overridable styling is provided that shows valid drop targets.

## Installation
`npm install --save inferno-dnd-sorter`

## Usage
```js
import Inferno from 'inferno';
import DnDSorter from 'inferno-dnd-sorter';

const itemStyle = { padding: 16, width: 300, margin: 'auto' };

const Demo = () => (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
        <DnDSorter onDrop={(e) => { console.log('Something was dropped!'); }}>
            <div style={itemStyle}>Asparagus</div>
            <div style={itemStyle}>Broccoli</div>
            <div style={itemStyle}>Carrot</div>
            <div style={itemStyle}>Daikon</div>
            <div style={itemStyle}>Endive</div>
        </DnDSorter>
    </div>
);

Inferno.render(<Demo />, document.getElementById('app'));
```

There's also a `webpack-dev-server` example that you can run with `npm install && npm run start`.

## Components

### DnDSorter
The top-level component that you wrap around all the draggable components. It supports the following props, all of which are **optional**.

#### NodeType: `VNode type`
Defaults to a `<div>` type. This can be used to make the DnDSorter create a different node around all its children.

#### className: `string`
Lets you append a className to the node that the DnDSorter creates around all its children.

#### onDragStart: `function(e)`
Is fired after the dragStart event.

[See the HTML Drag and Drop API for details about the event parameter passed in.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

#### onDragOver: `function(e)`
Is fired after the dragOver event.

[See the HTML Drag and Drop API for details about the event parameter passed in.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

#### onDragEnter: `function(e)`
Is fired after the dragEnter event.

[See the HTML Drag and Drop API for details about the event parameter passed in.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

#### onDragLeave: `function(e)`
Is fired after the dragLeave event.

[See the HTML Drag and Drop API for details about the event parameter passed in.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

#### onDragEnd: `function(e)`
Is fired after the dragEnd event.

[See the HTML Drag and Drop API for details about the event parameter passed in.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

#### onDrop: `function(e)`
Is fired after the drop event.

[See the HTML Drag and Drop API for details about the event parameter passed in.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Requirements
- `inferno >= 3.0.0`
