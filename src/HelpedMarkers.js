import React, {useEffect, useState} from 'react';
import axios from 'axios';

const HelpedMarker = props => {
    const [helpedList, setHelpedList] = useState();
    useEffect(() => {
        axios.get('/getallhelped')
        .then(results => {
            console.log('got results ' + results);
            setHelpedList(results.data);
        })
        .catch(error => {
            console.log('error getting all helped: ' + error);
        })
    }, [props.helperUseEffectSwitch])

    const handleClearAllHelped = () => {
        axios.post('/removeallhelped')
        .then(results => {
            console.log('success removing all helped');
            props.setHelperUseEffectSwitch(!props.helperUseEffectSwitch);
        })
        .catch(error => {
            console.log('error removing all helped: ' + error);
        })
    }
    return (<>
        <button onClick={handleClearAllHelped}>Clear helped list</button>
        <div id="helpedDiv">
            <ul>
                {helpedList && helpedList.map((helped, index) => (
                    <li key={index}>
                        <p>{helped.username}, {helped.description}, {helped.time}</p>
                    </li>
                ))}
            </ul>
     </div>
    </>)
}
export default HelpedMarker;