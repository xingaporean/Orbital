import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Typography, Card, Grid, CardHeader, CardContent, CardActionArea, TextField, Button, InputAdornment} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"

const apiURL = 'http://localhost:8000'

interface jobWrapper {
    id: number, identifier: string, poster: string, 
            description: string, date: string, duration: number, 
            approved: boolean, created_at: string, updated_at: string       
    
}

export default function JobIndex() {
    const [jobs, setJobs] = useState<Array<jobWrapper>>([])

    function update() {
        axios.get(apiURL + "/api/v1/jobs")
            .then(resp => setJobs(resp.data))
            .catch(resp => console.log(resp))
    }

    useEffect(update, [])

    const posts = jobs.map((job) => {
        return (
            <Grid item xs={4}>
                <Card>
                    <CardActionArea>
                    <CardHeader title={job.identifier}/>
                    <CardContent> 
                        <Typography>Description: {job.description}</Typography>
                        <Typography>Posted by: {job.poster}</Typography> 
                        <Typography>Date: {job.date}</Typography> 
                        <Typography>Duration: {job.duration}</Typography> 
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    })
    
    return (
        <div>
            <Typography variant="h4">Jobs</Typography>
            <Grid container justify='center'>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <TextField 
                            label="Search Jobs" 
                            fullWidth={true} 
                            InputProps={{ 
                                endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                                )
                            }} 
                        />
                        <Typography>Filter by:</Typography>
                        <Button> Clear All</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container spacing={2} justify='center'>
                {posts}
            </Grid>
            </Grid>
        </div>
    )
}
