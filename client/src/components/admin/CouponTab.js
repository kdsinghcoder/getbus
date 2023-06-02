import { Fragment, useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import CouponCard from "./CouponCard.js"

export default function CouponTab() {
    const [open, setOpen] = useState(false);
    const [couponName, setCouponName] = useState("");
    const [couponValue, setCouponValue] = useState(0);
    const [activeCoupon, setActiveCoupon] = useState([]);


    // to post on url admin/coupon/add
    const handleSubmit = async () => {
        const Payload = {
            CouponName: couponName,
            CouponValue: couponValue,
        };

        console.log(Payload);

        await axios
            .post("/admin/coupon/add", Payload)
            .then(function (response) {
                console.log("Success");
                fetchCoupons();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const fetchCoupons = async () => {

        try {
            axios.get('/admin/coupon')
                .then(function (response) {
                    setActiveCoupon(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }

    }

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <Fragment>
            <Button onClick={handleOpen} variant="gradient" size="sm">
                Coupon tab
            </Button>
            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader>All Active Coupons.</DialogHeader>
                <DialogBody divider>
                    {activeCoupon.map((coupon) => (
                        <CouponCard  coupon={coupon} fetchCoupons={fetchCoupons}  />
                    ))}
                </DialogBody>
                <DialogFooter>
                    <div class="row mx-2 my-2">
                        <div class="col">
                            <label class="form-label">Coupon Name</label>
                            <input class="form-control" type="text" placeholder="Enter Coupon Name" value={couponName} onChange={(event) => setCouponName(event.target.value)} />
                        </div>
                        <div class="col">
                            <label class="form-label">Coupon Value</label>
                            <input class="form-control" type="number" placeholder="Enter Coupon Value" value={couponValue} onChange={(event) => setCouponValue(event.target.value)} />
                        </div>
                        <div className="col">
                            <label class="form-label"> .</label>
                            <Button variant="gradient" color="blue" onClick={handleSubmit} size="sm" > <span>Add New Coupon</span> </Button>
                        </div>
                    </div>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1" > <span>Close Tab</span> </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}
