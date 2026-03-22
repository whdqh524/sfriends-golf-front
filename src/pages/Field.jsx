import React, {useEffect} from "react";
import RecordPage from "./RecordPage.jsx";
import {useRecordStore} from "@/stores/recordStore.js";

const Field = () => {
    // const recordStore = useRecordStore()
    // useEffect(() => {
    //     recordStore.clear();
    //     return () => recordStore.clear();
    // })
    return (
        <RecordPage type={'FIELD'}/>
    );
};

export default Field;
