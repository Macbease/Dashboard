import React, { useState, useEffect } from 'react';
import './sorting.css';
import axios from 'axios';

export default function Sorting({ setActiveState }) {
    const [unsortedWords, setUnsortedWords] = useState([""]);
    const [bags, setBags] = useState([]);
    const [selectedBag, setSelectedBag] = useState({ title: null, keyWords: [] });
    const [selectedWord, setSelectedWord] = useState("");
    const [submissionState, setSubmissionState] = useState(false);
    const [newBag, setNewBag] = useState(null);
    const [newKeyword, setNewKeyWord] = useState(null)

    useEffect(() => {
        fetchUnsortedWords();
        fetchBagTitles();
    }, [setActiveState, submissionState, newBag, unsortedWords]);

    async function fetchUnsortedWords() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:5050/api/v1/bag/getUnsortedTags", config)
            .then((res) => { setUnsortedWords(res.data) })
            .catch((err) => { console.log(err); alert(err.response.data) });
    }

    async function fetchBagTitles() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:5050/api/v1/bag/getAllKeywords", config)
            .then((res) => { setBags(res.data) })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    async function handleSubmissionEvent() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = {
            unsorted: selectedWord,
            bagTitle: selectedBag.title
        };
        axios.post("http://localhost:5050/api/v1/bag/sortATag", data, config)
            .then((res) => { alert(res.data); setSelectedBag({ title: null, keyWords: [] }); setSubmissionState(false) })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    async function handleCreationEvent() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = {
            keyWords: [selectedWord],
            title: newBag,
            unsorted: true
        };
        axios.post("http://localhost:5050/api/v1/bag/createBag", data, config)
            .then((res) => { console.log(res.data); alert(res.data); setNewBag(null); setSelectedWord(""); setSubmissionState(false); })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    async function handleDeletionEvent(item) {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = {
            word: item
        };
        axios.post("http://localhost:5050/api/v1/bag/deleteUnsortedWord", data, config)
            .then((res) => { alert(res.data); setSelectedWord("") })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    async function handleTagInsertionEvent() {
        let token = localStorage.getItem("authToken");
        let config = {
            headers: { authorization: `Bearer ${token}` }
        };
        let data = {
            unsorted: newKeyword,
            bagTitle: selectedBag.title
        };
        axios.post("http://localhost:5050/api/v1/bag/sortATag", data, config)
            .then((res) => { alert(res.data); setSelectedBag({ title: null, keyWords: [] }); setSubmissionState(false) })
            .catch((err) => { console.log(err); alert(err.response.data) })
    }

    function changeSubmissionState() {
        if (selectedWord && selectedBag.title) {
            setSubmissionState("existing");
        }
        else if (selectedBag.function === "add") {
            setSubmissionState("new");
        }
        else if (selectedBag.function === "addTagToBag") {
            setSubmissionState("addNewTag")
        }
        else {
            return alert("You must select a word and a bag");
        }
    }

    function changeBagState() {
        setSelectedBag({ title: null, keyWords: [], function: "add" })
    }

    function getCorrectContent() {
        if (selectedBag.function === "add") {
            return (
                <div className='create-bag-container absolute-center-column'>
                    <div className="bag-name-container absolute-center-column">
                        Enter the name of the new bag?
                        <input type="text" className='bag-name-input' placeholder='Enter bag name...' value={newBag} onChange={(e) => setNewBag(e.target.value)} />
                    </div>

                    <div className="bag-name-container absolute-center-column" style={{ justifyContent: "flex-start" }}>
                        Enter the keyword for the new bag.
                        <input type="text" className='bag-name-input' placeholder='Enter keyword...' value={selectedWord} onChange={(e) => setSelectedWord(e.target.value)} />
                    </div>

                </div>
            )
        }
        else if (selectedBag.function === "addTagToBag") {
            return (
                <div style={{ height: "100%" }} className='absolute-center-column'>
                    <div className="bag-name-container absolute-center-column" style={{ justifyContent: "flex-start", textAlign: "center" }}>
                        {`Enter the keyword to be inserted in the bag ${selectedBag.title}`}
                        <input type="text" className='bag-name-input' placeholder='Enter keyword...' value={newKeyword} onChange={(e) => setNewKeyWord(e.target.value)} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                    <div className="keywords-container-title absolute-center">{selectedBag.title}</div>
                    <div className="keywords-container-scroll">
                        {selectedBag.keyWords.map((i) => {
                            return (
                                <div className="keyword-preview-container absolute-center">{i}</div>
                            )
                        })}
                    </div>
                </>
            )
        }
    }

    function changeSelectedBagStateForTagAddition(item) {
        let data = item;
        data.function = "addTagToBag";
        setSelectedBag(data);
        return
    }


    function getCorrectPreviewScreen() {
        if (submissionState === "existing") {
            return (
                <div className='confirmation-container absolute-center-column'>
                    <div className="confirmation-container-title  absolute-center">
                        {`Are you sure to insert ${selectedWord} in ${selectedBag.title}?`}
                    </div>
                    <div className="confirmation-container-button absolute-center">
                        <div className="confirmation-button hover-effect absolute-center" onClick={() => { handleSubmissionEvent() }}>Yes</div>
                        <div className="confirmation-button hover-effect absolute-center" onClick={() => setSubmissionState(false)}>Cancel</div>
                    </div>
                </div>
            )
        }
        else if (submissionState === "new") {
            return (
                <div className='confirmation-container absolute-center-column'>
                    <div className="confirmation-container-title absolute-center">
                        {`Do you want to create a bag ${newBag} with the keyword ${selectedWord}?`}
                    </div>
                    <div className="confirmation-container-button absolute-center">
                        <div className="confirmation-button hover-effect absolute-center" onClick={() => { handleCreationEvent() }}>Yes</div>
                        <div className="confirmation-button hover-effect absolute-center" onClick={() => setSubmissionState(false)}>Cancel</div>
                    </div>
                </div>
            )
        }
        else if (submissionState === "addNewTag") {
            return (
                <div className='confirmation-container absolute-center-column'>
                    <div className="confirmation-container-title  absolute-center">
                        {`Are you sure to insert ${newKeyword} in ${selectedBag.title}?`}
                    </div>
                    <div className="confirmation-container-button absolute-center">
                        <div className="confirmation-button hover-effect absolute-center" onClick={() => { handleTagInsertionEvent() }}>Yes</div>
                        <div className="confirmation-button hover-effect absolute-center" onClick={() => setSubmissionState(false)}>Cancel</div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="keywords-container">
                    {getCorrectContent()}
                    <div className="sorting-button absolute-center hover-effect" onClick={() => { changeSubmissionState() }}>
                        <span class="material-symbols-outlined hover-effect" style={{ fontSize: "12px" }}>
                            done_outline
                        </span>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='sorting-container absolute-center'>
            <div className="unsorted-container absolute-center-column">
                <div className="unsorted-container-title absolute-center">Unsorted words...</div>
                <div className="unsorted-container-scroll">
                    {unsortedWords.map((item, index) => {
                        return (
                            <div className='unsorted-word-container absolute-center hover-effect' key={index} onClick={() => { setSelectedWord(item) }} style={selectedWord === item ? { border: "1px solid var(--title-color)" } : { border: "none" }}>
                                <div className='unsorted-word-delete absolute-center' onClick={() => { handleDeletionEvent(item) }}>
                                    <span class="material-symbols-outlined hover-effect" style={{ fontSize: "14px" }}>
                                        delete
                                    </span>
                                </div>
                                <div className='unsorted-word-text absolute-center'>
                                    {item}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="unsorted-container absolute-center-column">
                <div className="unsorted-container-title absolute-center">Bags Available...</div>
                <div className="unsorted-container-scroll">
                    {bags.map((item, index) => {
                        return (
                            <div className='unsorted-word-container absolute-center hover-effect' key={index} onClick={() => { setSelectedBag(item) }} style={selectedBag === item ? { border: "1px solid var(--title-color)" } : { border: "none" }}>
                                <div style={{ width: "80%" }} className='absolute-center'>{item.title}</div>
                                <div style={{ width: "20%" }} onClick={() => { changeSelectedBagStateForTagAddition(item) }}>
                                    <span class="material-symbols-outlined hover-effect">
                                        add
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{ marginTop: "6px" }} onClick={() => { changeBagState() }}>
                    <span class="material-symbols-outlined hover-effect">
                        add
                    </span>
                </div>
            </div>
            <div className="previewContainer">
                <div className="unsorted-container-title absolute-center">Keywords</div>
                {getCorrectPreviewScreen()}
            </div>
        </div>
    )
}
