import React, { useState, useRef } from 'react'
import { trackDB } from '../../firebase'
import {ListGroup, Overlay, Popover} from 'react-bootstrap';
import { format, intervalToDuration } from 'date-fns'
import { FaInfoCircle, FaTrash } from "react-icons/fa";


export default function TrackItem(props) {
    
    const interval = intervalToDuration({
        start: props.start,
        end: props.end
    });

    console.log(interval);

    const formatInterval = () => {
        let h ,m, s;
        if (interval.hours < 10) {
            h = "0" + interval.hours
        } else {
            h = interval.hours
        } 
        if (interval.minutes < 10) {
            m = "0" + interval.minutes
        } else {
            m = interval.minutes
        } 
        if (interval.seconds < 10) {
            s = "0" + interval.seconds
        } else {
            s = interval.seconds
        } 
        return `${h}:${m}:${s}`
    }

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    }

    const setVariantFromCategory = (c) => {
        let v;
        if (c === 'prod') {
            v = 'success'
        } else if (c === 'nv') {
            v = 'danger'
        }  else if (c === 'sleep') {
            v = 'primary'
        } else if (c === 'relationships') {
            v = 'info'
        }

        return v
    }

    const printFullCategory = (c) => {
        let v;
        if (c === 'prod') {
            v = 'Productivity'
        } else if (c === 'nv') {
            v = 'No Value'
        }  else if (c === 'sleep') {
            v = 'Sleep'
        } else if (c === 'relationships') {
            v = 'Relationships'
        }

        return v
    }

    return (
        <ListGroup.Item
            className="d-flex justify-content-start align-items-center" 
            variant={setVariantFromCategory(props.category)}
        >
            <div className="h4 m-1 col-sm">{props.title}</div>
            <div className="h6 m-1 col-sm d-none d-lg-block">{printFullCategory(props.category)}</div>
            <div className="col-sm">Duration: {formatInterval()}</div>
            <span className="col-sm-1 ml-auto m-1 d-none d-lg-block" onClick={handleClick}>
                <FaInfoCircle />
            </span>
            <span className="col-sm-1 d-none d-lg-block" onClick={event => trackDB.track.doc(props.id).delete()} >
                <FaTrash />
            </span>
            <Overlay
                show={show}
                target={target}
                placement="left"
                container={ref.current}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                <Popover.Content className='m-3'>
                    <strong>Start Time: </strong>{format(props.start, "hh:mm:ss, MMMM d")}
                </Popover.Content>
                <Popover.Content className='m-3'>
                    <strong>End Time: </strong>{format(props.end, "hh:mm:ss, MMMM d")}
                </Popover.Content>
                </Popover>
            </Overlay>
        </ListGroup.Item>
    )
}
