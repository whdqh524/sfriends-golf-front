
import React, {useEffect} from "react";
import RecordPage from "./RecordPage.jsx";
import {useRecordStore} from "../stores/recordStore.js";

const Screen = () => {
    // const recordStore = useRecordStore()
    // useEffect(() => {
    //     recordStore.clear();
    //     return () => recordStore.clear();
    // })
    return (
        <RecordPage type={'SCREEN'}/>
    );
};

export default Screen;
