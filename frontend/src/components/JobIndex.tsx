import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Typography, Card, Grid, CardContent, CardActionArea, TextField, Button, InputAdornment, CardMedia, Box, Theme, makeStyles} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"

const apiURL = 'http://localhost:8000'

interface JobWrapper {
    id: number, identifier: string, poster: string, location: string,
            description: string, start_date: string, end_date: string, 
            approved: boolean, created_at: string, updated_at: string          
}



export default function JobIndex() {
    const [jobs, setJobs] = useState<Array<JobWrapper>>([])

    function update() {
        axios.get(apiURL + "/api/v1/jobs")
            .then(resp => setJobs(resp.data))
            .catch(resp => console.log(resp))
    }

    useEffect(update, [])

    const useStyles = makeStyles((theme: Theme) => ({
      item: {
        minWidth: "300px",
        maxWidth: "450px"
      },
      searchbar: {
        minWidth: "500px",
        maxWidth: "1000px"
      },
      image: {
        height: 200
      },
      actionArea: {
        textDecoration: 'none'
      }
    }));

    const classes = useStyles()

    const posts = jobs.map((job) => {
        return (
          <Box
              m="auto"
              height={400}
              key={job.id} 
              className={classes.item}
          >
                <Card>
                    <CardActionArea disableRipple component={Link} to={`/jobs/${job.id}`} className={classes.actionArea}>
                        <CardMedia
                            component="img"
                            src="https://nus.edu.sg/images/default-source/logo/white-1200x630.jpg"
                            title={job.identifier}
                            className={classes.image}
                        />
                        <CardContent> 
                            <Box component={Typography} textOverflow="ellipsis">
                              {job.identifier}
                            </Box>
                            <Box component={Typography} textOverflow="ellipsis">
                              Posted by: {job.poster}
                            </Box>
                            <Box component={Typography} textOverflow="ellipsis">
                              Start: {job.start_date}
                            </Box>
                            <Box component={Typography} textOverflow="ellipsis">
                              Location: {job.location} 
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        )
    })
    
    return (
        <div>
            <Grid container justify='center' spacing={8}>
            <Grid 
                item 
                xs={12} 
                className={classes.searchbar}
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
