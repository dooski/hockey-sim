import React, { useState } from "react";
import { Redirect } from "react-router-dom"
import { NotificationManager } from "react-notifications"
import { Typography, Container, TextField, Grid, Button, Radio, RadioGroup, FormControlLabel, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core'
import styled from 'styled-components'
import API from "../utils/API";
import Symbol from "../components/TeamEmojis"

const MyTextField = styled(TextField)`
    .MuiInputBase-input {
        color: white;  
    }
    .MuiInputLabel-root {
        color: white;
    }
    .MuiOutlinedInput-root {
        border: 2px solid silver;
        border-radius: 20px
    }
    .MuiOutlinedInput-root {
    &:hover 
        fieldset {
        border-color: silver
    } 
    &.Mui-focused 
        fieldset {
        border-color: white
}}`

const MySelect = styled(Select)`
    .MuiInputBase-input {
        color: black;
        background-color: silver;
        padding: 5px;
        padding-right: 15px;
        margin: 5px;
        border-radius: 20px;
    }
    .MuiInputLabel-root {
        color: white;
    }
    .MuiOutlinedInput-root {
    &:hover 
        fieldset {
        border-color: silver
    } 
    &.Mui-focused 
        fieldset {
        border-color: white
}}`


function Login() {
    const teams = [["TOR", "Toronto Brewskis"], ["NSH", "Nashville Dollys"], ["PHL", "Philadelphia Pineapples"], ["BUR", "Burlington Lumberjacks"], ["LAK", "Los Angeles Kickflips"],
        ["CHI", "Chicago Squalls"], ["SFB", "Santa Fe Buckaroos"], ["PIT", "Pittsburgh Good Boys"], ["NYR", "New York Rats"], ["VAL", "Valhalla Omens"], 
    ["MOS", "Moscow Red"], ["KCS", "Kansas City Spookies"], ["BUF", "Buffalo Starlights"], ["BOS", "Boston Chowdahs"], ["ROC", "Rochester Bones"], 
["CLE", "Cleveland Yankees"], ["NDD", "New Dorp Dylans"], ["SJP", "San Jose Pigeonkickers"], ["SEA", "Seattle Sirens"], ["MIN", "Minneosta Frosties"], 
    ["FAR", "Fargo Slam Dunks"], ["DCH", "DC Hockey Team"], ["HOU", "Houston Invaders"], ["BAL", "Baltimore Wham"], ["MAT", "Matterhorn Elephants"],
    ["WVM", "West Virginia Mothmen"], ["MON", "Montreal Panic"], ["OTT", "Ottawa Tulips"], ["NOR", "New Orleans Moonshine"], ["POR", "Portland Shrooms"], 
    ["VAN", "Vancouver Foxtrots"], ["LIB", "Long Island Beach Bums"]]
    const LoginBox = {
        background: "black",
        width: "90%",
        maxWidth: "700px",
        marginTop: 35,
        marginBottom: 35,
        borderRadius: 20,
        padding: 30,
        color: "white",
        border: "2px solid silver"
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [value, setValue] = useState("register");
    const [personality, setPersonality] = useState("Cool");
    const [team, setTeam] = useState("BUF")
    const [redirect, setRedirect] = useState(null)

    const Register = e => {
        e.preventDefault();
            const userData = {
                username: username,
                personality: personality,
                email: email,
                password: password,
                team: team
            };
            API.userRegister(userData)
                .then(res => {
                    console.log(res)
                    API.userLogin(userData)
                        .then(res => {
                            console.log(res)
                            NotificationManager.success("Welcome!", "You're In!", 4000)
                            setRedirect('/plond')
                        })
                        .catch(err => {
                            console.log(err);
                            console.log(err.response)
                            NotificationManager.error("Double-check everything is filled in & that your email is not already in use!", "Nope! Didn't Work!", 9000)
                        })
                })
                .catch(err => {
                    console.log(err);
                    console.log(err.response)
                    NotificationManager.error("Double-check everything is filled in & that your email is not already in use!", "Nope! Didn't Work!", 9000)
                })
    }

    const Login = e => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        API.userLogin(userData)
            .then(res => {
                console.log(res)
                NotificationManager.success("Welcome back!", "Heyooooooo!", 6000)
                setRedirect('/plond')
            })
            .catch(err => {
                console.log(err);
                console.log(err.response)
                NotificationManager.error("Double-check your stuff!", "Uh oh!", 6000)
            })
    }


    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleChangeType = (e) => {
        setPersonality(e.target.value);
    }
    const handleChangeTeam = (e) => {
        setTeam(e.target.value);
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <Container style={LoginBox}>
            <div>
                <Typography variant="h3">Welcome to the <b>Plond</b>.</Typography>
                <hr />
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="login" name="login1" value={value} onChange={handleChange}>
                        <FormControlLabel value="login" control={<Radio />} label="Login" />
                        <FormControlLabel value="register" control={<Radio />} label="Register" />
                    </RadioGroup>
                </FormControl>
                <hr /> {value == "login" ? (
                    <Typography variant="subtitle2"><i>Come thru</i></Typography>
                ) : (<div></div>)}
                <form>
                    <Grid container spacing={3} className="centerBox">
                        {value == "register" ? (
                        
                            <Grid item xl={12}>
                                <Typography variant="subtitle"><b>What's your name?</b></Typography>
                                <br/>
                                <MyTextField
                                    variant="outlined"
                                    type="email"
                                    label="Name"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>) : (<div></div>)}
                        {value == "register" ? (
                            <Grid item xl={6}>
                                <Typography variant="subtitle"><b>What's your personality type?</b></Typography>
                                <br/>
                                <MySelect aria-label="type" name="type" value={personality} onChange={handleChangeType}>
                                    <MenuItem value="Grizzly">Grizzly</MenuItem>
                                    <MenuItem value="Cool">Cool</MenuItem>
                                    <MenuItem value="Weird">Weird</MenuItem>
                                    <MenuItem value="Funny">Funny</MenuItem>
                                    <MenuItem value="Reptile">Reptile</MenuItem>
                                    <MenuItem value="Whimsical">Whimsical</MenuItem>
                                    <MenuItem value="Charming">Charming</MenuItem>
                                </MySelect>
                            </Grid>) : (<div></div>)}
                            {value == "register" ? (
                            <Grid item xl={6} alignContent="center">
                                <Typography variant="subtitle"><b>Choose a Team</b></Typography>
                                <br/>
                                <FormControl>
                                <MySelect labelId="team-select-label" id="team-select" aria-label="team" value={team} onChange={handleChangeTeam}>
                                    {teams.map((myTeam) => (
                                        <MenuItem value={myTeam[0]}> <Symbol abrv={myTeam[0]}/> <b>{myTeam[1]}</b></MenuItem>
                                    ))}
                                </MySelect>
                                </FormControl>
                            </Grid>) : (<div></div>)}
                        <Grid item xl={6}>
                            <br/>
                            <MyTextField
                                variant="outlined"
                                type="email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xl={6}>
                            <br/>
                            <MyTextField
                                variant="outlined"
                                type="password"
                                label="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <br></br>
                    <div className="centerBox">
                        {value == "login" ? (
                            <Button variant="contained" onClick={Login}>Login</Button>
                        ) : (
                            <Button variant="contained" onClick={Register}>Register</Button>)}
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Login