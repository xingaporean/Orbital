import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router';
import axios from 'axios'
import { Table, TableContainer, TableRow, TableBody, TableCell, Button, Typography} from '@material-ui/core'

const apiURL = 'http://localhost:8000'

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface JobWrapper {
    id: number, identifier: string, poster: string, location: string,
            description: string, start_date: string, end_date: string, 
            approved: boolean, created_at: string, updated_at: string          
}

export default function JobView(props: Props) {
    const [loaded, setLoaded] = useState(false)
    const [job, setJob] = useState<JobWrapper>({ id: 0, identifier: "", poster: "", location: "",
                                                description: "", start_date: "", end_date: "", 
                                                approved: false, created_at: "", updated_at: "" })
    
    function update () {
        axios.get(apiURL + '/api/v1/jobs/' + props.match.params.id)
          .then(resp => {
            setJob(resp.data)
            setLoaded(true)
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
                                <Typography>{job.poster}</Typography>
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
