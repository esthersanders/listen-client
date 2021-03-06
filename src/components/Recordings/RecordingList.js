//module to list recordings on the excerpt details
import React, { useEffect, useContext, useState } from "react";
import { RecordingContext } from "./RecordingProvider";
import { Box, Heading } from "grommet";
import { Recording } from "./Recording"
export const RecordingList = (props) => {
  const { getRecordingByExcerpt } = useContext(RecordingContext);

  const [recordings, setRecordings] = useState([])
  const excerptId = props.match.params.excerptId

  const [change, setChange] = useState(false)

  const func = () => {
    change ? setChange(false) : setChange(true)

}
  //gets the recordings from the database
  useEffect(() => {
    getRecordingByExcerpt(excerptId)
    .then(setRecordings);
  }, [change]);


  return (
    <Box>
      <Heading level="2" margin={{bottom: "none"}} >Recordings</Heading>

      <Box className="categoryList" direction="row">
     
        <Box>

          {recordings.map((recordingObject) => {
            return (
              <Recording recordingId = {recordingObject.id} excerptId={excerptId} func={func} {...props}/>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
