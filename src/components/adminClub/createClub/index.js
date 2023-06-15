import React, { useState } from 'react';
import FormA from './formA';
import GalleryAdder from './galleryAdder';
import EventAdder from './eventAdder';
import TeamAdder from './teamAdder';
import Featuring from './featuring';
import './createClub.css';

export default function CreateClub({ setActiveState }) {
    const [formState, setFormState] = useState("Step1");
    const [clubId, setClubId] = useState(null);

    return (
        <div className='absolute-center-column'>
            <div className="admin-club-container-title text-center">Club Form</div>
            {getCorrectForm(formState, setFormState, clubId, setClubId)}
        </div>
    )
}

const getCorrectForm = (formState, setFormState, clubId, setClubId) => {
    switch (formState) {
        case "Step1":
            return <FormA setFormState={setFormState} setClubId={setClubId} />
        case "Step2":
            return <GalleryAdder setFormState={setFormState} clubId={clubId} workSpace={false} />
        case "Step3":
            return <EventAdder setFormState={setFormState} clubId={clubId} />
        case "Step4":
            return <TeamAdder setFormState={setFormState} clubId={clubId} />
        case "Step5":
            return <Featuring setFormState={setFormState} clubId={clubId} />
        case "Step6":
            return <GalleryAdder setFormState={setFormState} clubId={clubId} workSpace={true} />
        default:
            return <FormA setFormState={setFormState} />
    }
}