import { Button } from '@material-tailwind/react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { AiFillDelete } from 'react-icons/ai'
function CouponCard(props) {


    const deleteCoupon = async () => {
        axios.delete(`/admin/coupon/${props.coupon._id}`).then((response) => {
            props.fetchCoupons();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Card className="mx-2 my-2" bg="info" key="info" text='white' >
            <Card.Header  >
                <AiFillDelete onClick={deleteCoupon} />
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.coupon.CouponName} : {props.coupon.CouponValue} % </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default CouponCard;