import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Table, TableContainer, TableRow, TableBody, TableCell, Paper} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const apiURL = 'http://localhost:8000'

export default function CreateJob() {
    
    const [identifier, setIdentifier] = useState<String>("")
    const [name, setName] = useState<String>("")
    const [location, setLocation] = useState<String>("")
    const [description, setDescription] = useState<String>("")
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
        new Date(),
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
        new Date(),
      );

    const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(e.target.value)
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value)
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const handleStartDateChange = (date: Date | null) => {
        setSelectedStartDate(date);
    };
    
    const handleEndDateChange = (date: Date | null) => {
        setSelectedEndDate(date);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        axios.post(apiURL + '/api/v1/jobs', {
            identifier: identifier,
            organisation_name: name,
            location: location,
            description: description,
            start_date: selectedStartDate,
            end_date: selectedEndDate
        })
        .then(resp => console.log(resp))
        .catch(resp => console.log(resp))
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                <TextField 
                                    required 
                                    id="job-identifier" 
                                    label="Name of Event" 
                                    variant="outlined" 
                                    value={identifier} 
                                    fullWidth={true}
                                    onChange={handleIdentifierChange}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <TextField 
                                    required 
                                    id="job-name" 
                                    label="Name of Organisation" 
                                    variant="outlined" 
                                    value={name} 
                                    fullWidth={true}
                                    onChange={handleNameChange}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <TextField 
                                    required 
                                    id="job-location" 
                                    label="Location" 
                                    variant="outlined"
                                    value={location} 
                                    fullWidth={true}
                                    onChange={handleLocationChange}
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <TextField 
                                    required 
                                    id="job-description" 
                                    label="Description" 
                                    multiline rows={10} 
                                    variant="outlined"
                                    value={description} 
                                    fullWidth={true}
                                    onChange={handleDescriptionChange}
                                />
                                </TableCell>
                            </TableRow>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TableRow>
                                <TableCell>
                                <KeyboardDatePicker 
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="job-start-date"
                                    label="Start Date"
                                    value={selectedStartDate}
                                    onChange={handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }} 
                                />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                <KeyboardDatePicker 
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="job-end-date"
                                    label="End Date"
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }} 
                                />
                                </TableCell>
                            </TableRow>
                            </MuiPickersUtilsProvider>
                            <TableRow>
                                <TableCell align="right">
                                    <Button type="submit">Submit</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </div>
    )
}
