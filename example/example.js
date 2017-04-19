/* eslint-disable */

import Inferno from 'inferno';
import DnDSorter from '../src/lib';

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
