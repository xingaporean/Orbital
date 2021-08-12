import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Typography, Card, Grid, CardContent, CardActionArea, TextField, Button, InputAdornment, CardMedia, Theme, makeStyles} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"

const apiURL = 'http://localhost:8000'

interface JobWrapper {
    id: number, identifier: string, organisation_name: string, location: string,
            description: string, start_date: string, end_date: string, 
            approved: boolean, created_at: string, updated_at: string          
}

export default function JobIndex() {
    const [jobs, setJobs] = useState<Array<JobWrapper>>([])

    function update() {
        axios.get(apiURL + "/api/v1/approvedjobs")
            .then(resp => setJobs(resp.data))
            .catch(resp => console.log(resp))
    }

    useEffect(update, [])

    const useStyles = makeStyles((theme: Theme) => ({
      item: {
        minWidth: "400px",
        maxWidth: "450px",
      },
      card: {
        height: "350px"
      },
      content: {
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      searchbar: {
        minWidth: "500px",
        maxWidth: "1000px"
      },
      image: {
        height: "210px"
      },
      actionArea: {
        textDecoration: 'none'
      }
    }));

    const classes = useStyles()

    const posts = jobs.map((job) => {
        return (
          <Grid
              xs={6}
              item 
              key={job.id} 
              className={classes.item}
          >
                <Card className={classes.card}>
                    <CardActionArea disableRipple component={Link} to={`/jobs/${job.id}`} className={classes.actionArea}>
                        <CardMedia
                            title={job.identifier}
                        >
                        <img src="https://nus.edu.sg/images/default-source/logo/white-1200x630.jpg" className={classes.image} alt={job.identifier}/>
                        </CardMedia>
                        <CardContent className={classes.content}> 
                            <Typography noWrap>
                              {job.identifier}
                            </Typography>
                            <Typography noWrap>
                              Posted by: {job.organisation_name}
                            </Typography>
                            <Typography noWrap>
                              Start: {job.start_date}
                            </Typography>
                            <Typography noWrap>
                              Location: {job.location} 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    })
    
    return (
        <div>
            <Grid container justify='center' spacing={2}>
              {/*
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
                          */}
                  {posts}
            </Grid>
        </div>
    )
}
