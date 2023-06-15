import React, { useState } from 'react';
import './adminProps.css';
import OverviewProps from './overViewProps';
import CreateProp from './createProp';
import DecommissionProps from './decommisionProp';
import DeleteProp from './deleteProp';
import ReceiveProp from './receiveProp';
import DispatchProp from './dispatchProp';
import RecommissionProp from './recommissionProp';
import ReturnTime from './returnTime';

export default function AdminProps() {
    const [activeState, setActiveState] = useState("Home");
    return (
        <div>
            {getCorrectDisplay(activeState, setActiveState)}
        </div>
    )
}

const getCorrectDisplay = (activeState, setActiveState) => {
    switch (activeState) {
        case "Home":
            return <OverviewProps setActiveState={setActiveState} />
        case "Create":
            return <CreateProp setActiveState={setActiveState} />
        case "Decommission":
            return <DecommissionProps setActiveState={setActiveState} />
        case "Delete":
            return <DeleteProp setActiveState={setActiveState} />
        case "Receive":
            return <ReceiveProp setActiveState={setActiveState} />
        case "Dispatch":
            return <DispatchProp setActiveState={setActiveState} />
        case "RecommissionProp":
            return <RecommissionProp setActiveState={setActiveState} />
        case "ReturnTime":
            return <ReturnTime setActiveState={setActiveState} />
        default:
            break;
    }
}