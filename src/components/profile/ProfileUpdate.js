import React, { useEffect, useState } from "react"
import { useHistory,useParams } from "react-router-dom"
import { getCurrentProfile, updateProfile } from "./ProfileManager"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Badge, Button, Form, FormGroup, Image, Stack } from 'react-bootstrap'


// const initialState = {
//     username:,
//     first_name: ,
//     last_name: ,
//     email: ,
//     profile_img: ,
//     bio: ,
//     password: 
// };

export const ProfileUpdate = () => {
    const history = useHistory()
    const  profileId  = useParams()
    const [profile, setProfile] = useState({})
    const [uploadedPhotos, setUploadedPhotos] = useState({})

    console.log(profile)

    useEffect(() => {
            getCurrentProfile()
            .then((data) => {setProfile(data)})
    },[])


    const inputHandler = (e) => {
        const { id, value } = e.target;
        setProfile({ ...profile, [id]: value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { username,first_name,last_name,email,profile_img, bio,password, } = profile

        const ProfileObj = {
            username: profile.user?.username,
            first_name: profile.user?.first_name,
            last_name: profile.user?.last_name,
            email: profile.user?.email,
            profile_img: uploadedPhotos,
            bio: profile.bio,
            password: profile.user?.password
        }
        updateProfile(ProfileObj).then(() => history.push("/profiles"))
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
         let base64Image = {...uploadedPhotos} 
         base64Image = base64ImageString
         setUploadedPhotos(base64Image)
            // Update a component state variable to the value of base64ImageString
        });
    }
}