import React, { useRef,useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"

export const Register=()=> {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    // const profile_img = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()
    const [uploadedPhotos, setUploadedPhotos] = useState({})

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                // "profile_img": uploadedPhotos,
                "bio": bio.current.value,
                "password": password.current.value
            }

            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("mc_token", res.token)
                        localStorage.setItem("currentUser", res.userId)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }
    // const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    // }
    
    // const createImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         console.log("Base64 of file is", base64ImageString);
    //      let base64Image = {...uploadedPhotos} 
    //      base64Image = base64ImageString
    //      setUploadedPhotos(base64Image)
    //         // Update a component state variable to the value of base64ImageString
    //     });
    // }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Let others know a little bit about you..." />
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="profileImg"> Profile Picture </label>
                    <input type="file" name="profile_img"  className="form-control" onChange={createImageString} placeholder="Upload a profile picture" />
                </fieldset> */}
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register" style={{color: "white"}}>
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
