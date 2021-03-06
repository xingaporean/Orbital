import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import axios from 'axios'
import { Table, TableContainer, TableRow, TableBody, TableCell, Button, Typography} from '@material-ui/core'

const apiURL = 'http://localhost:8000'

interface MatchParams {
    id: string;
}

interface userWrapper {
    logged_in: boolean, 
    user: any
}

interface Props extends RouteComponentProps<MatchParams> {
    user: userWrapper,
}

interface JobWrapper {
    id: number, identifier: string, organisation_name: string, location: string,
            description: string, start_date: string, end_date: string, 
            approved: boolean, created_at: string, updated_at: string          
}

export default function JobView(props: Props) {
    const [loaded, setLoaded] = useState(false)
    const [job, setJob] = useState<JobWrapper>({ id: 0, identifier: "", organisation_name: "", location: "",
                                                description: "", start_date: "", end_date: "", 
                                                approved: false, created_at: "", updated_at: "" })
    
    let history = useHistory();

    function update () {
        axios.get(apiURL + '/api/v1/jobs/' + props.match.params.id)
          .then(resp => {
            setJob(resp.data)
            setLoaded(true)
          })
          .catch(resp => console.log(resp))
      }

    function approve () {
        const job = {approved: true}
        axios.put(apiURL + '/api/v1/jobs/' + props.match.params.id, job)
        .then(resp => {
            console.log(resp)
            history.goBack()
        })
        .catch(resp => console.log(resp))
    }

    function destroy () {
        axios.delete(apiURL + '/api/v1/jobs/' + props.match.params.id)
        .then(resp => {
          console.log(resp)
          history.goBack()
        })
        .catch(resp => console.log(resp))
    }
    
    
    useEffect(update, [props.match.params.id])

    return (
        <div>
            {loaded &&
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                <Typography>{job.identifier}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <Typography>{job.organisation_name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <Typography>{job.location}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <Typography>{job.start_date}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <Typography>{job.end_date}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <Typography>{job.description}</Typography>
                                </TableCell>
                            </TableRow>
                            

                                <TableRow>
                                    <TableCell>
                                    <Button onClick={approve}> Approve Listing </Button>
                                    </TableCell>
                                    <TableCell>
                                    <Button onClick={destroy}> Reject Listing </Button>
                                    </TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell>
                                    <Button> Register </Button>
                                    </TableCell>
                                </TableRow>
                                
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    )
}
