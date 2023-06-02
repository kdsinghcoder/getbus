import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function AdminLogin(props) {
    const [open, setOpen] = useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleOpen = () =>{
        if(email==="admin@gmail.com" && password==="admin"){
            props.handleLogin(true);
            setOpen(!open);
        }
    } 

    return (
        <Fragment>
            <Button onClick={handleOpen} variant="gradient" id="AdminLogin">
                Admin Login
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Enter Credentials</DialogHeader>
                <DialogBody divider>
                    <div class="row mx-2 my-2">
                        <div class="col">
                            <label class="form-label">Admin email</label>
                            <input class="form-control" type="text" placeholder="Enter Bus Name" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div class="col">
                            <label class="form-label">Password</label>
                            <input class="form-control" type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Login</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}