//module to play a recording and render its date and label
import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GoalsPerRecording } from "../Goals/GoalsPerRecording"
import { RecordingContext } from "./RecordingProvider"
import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Text,
} from "grommet";
import { CommentList } from "../Comments/CommentList"
import { ExcerptContext } from "../Excerpts/ExcerptProvider"

export const Recording = (props) => {
    const { getRecordingById, deleteRecording } = useContext(RecordingContext)

    const [recordingObject, setRecordingObject] = useState({})

    const { getExcerptById } = useContext(ExcerptContext)

    const [relatedExcerpt, setRelatedExcerpt] = useState({})

    const excerptId = props.excerptId

    const toggleFunction = () => {
        props.func()
    } 


    useEffect(() => {
        getRecordingById(props.recordingId)
            .then(setRecordingObject)

        getExcerptById(excerptId)
            .then(setRelatedExcerpt)


    }, [])


    return (
        <>

            <Box>
                <Box margin="medium">
                    <Heading level="3" >{recordingObject.label}</Heading>
                    <Text>{recordingObject.date}</Text>

                    <audio src={recordingObject.audio} controls />
                    {relatedExcerpt.created_by_current_user
                        ? (
                            <>
                                <Button
                                    primary
                                    as={Link}
                                    onClick={() => deleteRecording(recordingObject.id).then(toggleFunction)}
                                    label="Delete Recording"
                                    margin="small"
                                />
                                <Button
                                    primary
                                    as={Link}
                                    to={{ pathname: `/goals/${recordingObject.id}/create` }}
                                    label="Add Goal"
                                    margin="small"

                                />

                            </>
                        )
                        :
                        <Button
                            primary
                            as={Link}
                            to={{ pathname: `/comments/${recordingObject.id}/create` }}
                            label="Add Comment"
                            margin="small"
                        />
                    }




                    <Box margin="medium">

                        <GoalsPerRecording recordingId={recordingObject.id} {...props} relatedExcerpt={relatedExcerpt} />
                        <CommentList recordingId={recordingObject.id} {...props} relatedExcerpt={relatedExcerpt} />

                    </Box>
                </Box>
            </Box>
        </>

    )
}


