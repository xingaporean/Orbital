import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Typography, Card, Grid, CardContent, CardActionArea, TextField, Button, InputAdornment, CardMedia} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"

const apiURL = 'http://localhost:8000'

interface jobWrapper {
    id: number, identifier: string, poster: string, location: string,
            description: string, start_date: string, end_date: string, 
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
            <Grid 
                xs={6}
                item 
                style = {{
                    minWidth: "300px",
                    maxWidth: "450px"
                }}
                key={job.id} 
            >
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            src="https://nus.edu.sg/images/default-source/logo/white-1200x630.jpg"
                            title={job.identifier}
                        />
                        <CardContent> 
                            <Typography>{job.identifier}</Typography> 
                            <Typography>Posted by: {job.poster}</Typography> 
                            <Typography>Start: {job.start_date}</Typography> 
                            <Typography>Location: {job.location}</Typography> 
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    })
    
    return (
        <div>
            <Grid container justify='center' spacing={8} >
            <Grid 
                item 
                xs={12} 
                style = {{
                    minWidth: "500px",
                    maxWidth: "1000px"
                }} 
            >
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
            <Grid 
                container 
                spacing={2} 
                justify="center"
            >
                {posts}
            </Grid>
            </Grid>
        </div>
    )
}
