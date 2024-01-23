import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

// Import MUI components
import { TextField, Button, Typography, Paper } from '@material-ui/core';

// Import styles
import useStyles from './Form.styles';

const Form = () => {
    // Set Form data state
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        description: '',
        tags: '',
        selectedFile: '',
    });

    // Set styles
    const classes = useStyles();

    // Form handle submit
    const handleSubmit = () => {

    }

    // Form handle clear
    const clear = () => {

    }

    return (
        <>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    {/* Form title */}
                    <Typography variant="h6">Creating a Post</Typography>

                    {/* Form input creator */}
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />

                    {/* Form input title */}
                    <TextField name="title" variant="outlined" label="Title" fullWidth multiline rows={4} value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

                    {/* Form input description */}
                    <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />

                    {/* Form input tags */}
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />

                    {/* Form input file */}
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>

                    {/* Form submit button */}
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                    {/* Form clear button */}
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </>
    )
}

export default Form