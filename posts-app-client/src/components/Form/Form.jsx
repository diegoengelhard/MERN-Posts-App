import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

// Import Redux actions
import { createPost, updatePost } from '../../redux/actions/posts/posts.actions';

// Import MUI components
import { TextField, Button, Typography, Paper } from '@material-ui/core';

// Import styles
import useStyles from './Form.styles';

// Import toasts
import { toast } from 'react-toastify';

const Form = ({ currentId, setCurrentId }) => {
    // Set states
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log('user from form:', user);
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        description: '',
        tags: '',
        selectedFile: '',
    });

    // Get post from Redux store
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    // Set dispatch
    const dispatch = useDispatch();

    // Set navigate
    const navigate = useNavigate();

    // Set styles
    const classes = useStyles();

    // Use Effect to set user
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        setUser(profile);

        if (profile && profile.user) {
            setPostData((prevData) => ({ ...prevData, creator: `${profile.user.username}` }));
        }
    }, []);

    // Use Effect to set post data
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    // Form handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validations
            if (!postData.creator || !postData.title || !postData.description) return toast.error('Missing fields!');

            if (currentId) {
                // Update post
                dispatch(updatePost(currentId, postData));
                toast.success('Post updated successfully!');
            } else {
                // Dispatch createPost action
                dispatch(createPost(postData));
                toast.success('Post created successfully!');
            }

            // Clear form
            clear();
        } catch (error) {
            console.log(error);
        }
    }

    // Form handle clear
    const clear = () => {
        // Clear currentId
        setCurrentId(null);

        // Clear form data
        setPostData({
            title: '',
            description: '',
            tags: '',
            selectedFile: '',
        });
    }

    return (
        <>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    {/* Form title */}
                    <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Post</Typography>

                    {/* Form input creator */}
                    {user && <Typography variant="subtitle1">Creator: {postData.creator}</Typography>}

                    {/* Form input title */}
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} disabled={!user} />

                    {/* Form input description */}
                    <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} disabled={!user} />

                    {/* Form input tags */}
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} disabled={!user} />

                    {/* Form input file */}
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} disabled={!user} />
                    </div>

                    {/* Form submit button */}
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={() => !user && navigate('/auth')}>
                        {user ? 'Submit' : 'Access Now to Post'}
                    </Button>


                    {/* Form clear button */}
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth disabled={!user}>
                        Clear
                    </Button>
                </form>
            </Paper>
        </>
    )
}

export default Form