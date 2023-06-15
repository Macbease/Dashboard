import React, { useEffect, useState } from 'react';
import './overViewProps.css';
import projector from '../../../assets/img/props/projector.png';
import chess from '../../../assets/img/props/chess.jpeg';
import board from '../../../assets/img/props/board.avif';
import canvas from "../../../assets/img/props/pexels-photo-2716895.webp";
import axios from 'axios';



export default function OverviewProps({ setActiveState }) {


    const [projectorStats, setProjectorStats] = useState({ total: 0, available: 0 });
    const [chessStats, setChessStats] = useState({ total: 0, available: 0 });
    const [boardStats, setBoardStats] = useState({ total: 0, available: 0 });
    const [canvasStats, setCanvasStats] = useState({ total: 0, available: 0 });

    const data = [
        { name: "Projector", data: [{ key: "In Use", value: projectorStats.total }, { key: "Available", value: projectorStats.available }], image: projector },
        { name: "Chess", data: [{ key: "In Use", value: chessStats.total }, { key: "Available", value: chessStats.available }], image: chess },
        { name: "Board", data: [{ key: "In Use", value: boardStats.total }, { key: "Available", value: boardStats.available }], image: board },
        { name: "Canvas", data: [{ key: "In Use", value: canvasStats.total }, { key: "Available", value: canvasStats.available }], image: canvas }
    ];

    useEffect(() => {
        fetchStats("Projector");
        fetchStats("Chess");
        fetchStats("Board");
        fetchStats("Canvas");
    }, [])

    function fetchStats(propName) {
        const data = { propName };
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.post("http://localhost:5050/api/v1/props/getStats", data, config)
            .then((res) => {
                if (propName === "Projector") setProjectorStats(res.data);
                else if (propName === "Chess") setChessStats(res.data);
                else if (propName === "Board") setBoardStats(res.data);
                else setCanvasStats(res.data)
            })
    }

    return (
        <div>
            <div className='admin-club-container'>
                <div className="admin-club-container-title text-center">All the props that are featuring...</div>
                <div className="props-overview-container absolute-center">
                    {data.map((item, index) => {
                        return (
                            <div>
                                <div className="props-overview-card absolute-center-column hover-effect" key={`index-${index}`}>
                                    <div className="props-overview-card-top">
                                        <img src={item.image} alt="" className='square-image' style={{ borderRadius: "22px 22px 0px 0px" }} />
                                    </div>
                                    <div className="props-overview-card-bottom absolute-center-column">
                                        {item.data.map((x, index) => {
                                            return (
                                                <div className="props-overview-data-container absolute-center">
                                                    <div className="props-overview-data-container-left text-center">{x.key}</div>
                                                    <div className="props-overview-data-container-right text-center">{x.value}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="prop-overview-title text-center hover-effect">{item.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="props-overview-controls absolute-center" style={{ justifyContent: "space-around" }}>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Create") }}>Register new prop</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Decommission") }}>Decommission prop</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Receive") }}>Receive prop</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Delete") }}>Delete prop</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("Dispatch") }}>Dispatch prop</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("RecommissionProp") }}>Recommission prop</div>
                <div className="props-overview-control-box text-center hover-effect" onClick={() => { setActiveState("ReturnTime") }}>ReturnTime</div>
            </div>
        </div>
    )
}
