import React, { useState, useEffect } from 'react'
import {ListGroup} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { trackDB } from '../../firebase';
import TrackItem from './TrackItem'


export default function TrackList() {
    const [trackList, setTrackList] = useState([]);
    const { currentUser } = useAuth();

    // Database change tacker
    useEffect(() => {
        const unsubscribe = trackDB.track
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt')
        .onSnapshot(querySnapshot => {
            setTrackList(querySnapshot.docs.map(doc => ({id: doc.id, track: doc.data()})));
        })
        return () => unsubscribe();
    }, [])
    return (
        <ListGroup key={currentUser.uid}>
        {    trackList.map(track => (
                    <TrackItem 
                        key={track.id}
                        id={track.id}
                        title={track.track.title}
                        category={track.track.category}
                        start={track.track.startTime}
                        end={track.track.endTime}
                    />
            ))
        }
        </ListGroup>
    )
}
