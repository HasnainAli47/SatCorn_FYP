import React, { useEffect, useState } from "react";
//import Axios from 'axios';
//import ReactModal from "react-modal";
import Left from "components/Jobs/Left";
import Right from "components/Jobs/Right";

function Jobs() {

    return(
        <>
        <div className="relative flex w-full z-0">
            <div className="relative w-6/14 p-0">
                <Left/>
            </div>
                <Right/>
        </div>
        </>
    );
}

export default Jobs;