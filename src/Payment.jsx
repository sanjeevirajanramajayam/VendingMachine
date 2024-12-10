import React, { useState, useRef } from "react"

function Payment(props) {

    const [payment, setPayment] = useState("");
    const [paymentmsg, setPaymentmsg] = useState(<></>);
    const InputRef = useRef(0);

    const styles = {
        paddingLeft: "30px",
        paddingBottom: "30px"
    }

    const h1styles = {
        paddingBottom: "10px"
    }

    const inputstyles = {
        marginRight: "10px",
        marginBottom: "10px"
    }

    const buttonstyles = {
        marginTop: "10px",
        display: "block",
        width: "10%",
        marginBottom: "10px"
    }

    const discountstyles = {
        marginTop: "10px",
    }

    const pstyles = {
        marginTop: "10px"
    }

    function handlePaymentChange(event) {
        setPayment(event.target.value);
    }

    var payment_mesg = <>
        <h1 style={h1styles}>Payment Options</h1>
        <select value={payment} onChange={handlePaymentChange}>
            <option value="">Select a Payment Option</option>
            <option value="Cash">Cash</option>
            <option value="GPay">GPay</option>
        </select>
        <p style={pstyles}>Discount Code:</p>
        <input ref={InputRef} style={discountstyles}></input>
        <button style={buttonstyles} onClick={handlePayment}>Pay</button>
    </>

    function handlePayment() {
        var total = props.total;
        if (payment != "") {
            if (InputRef.current.value == "" && total != 0) {
                if (payment != "") {
                    setPaymentmsg(<p>Payment of {total} through {payment} was successful.</p>)
                }
                else {
                    setPaymentmsg(<div></div>)
                }
                props.func()
            }
            else if (InputRef.current.value == "DISCOUNT30" && total != 0) {
                total = total * 70 / 100;
                if (payment != "") {
                    setPaymentmsg(<p>Payment of {total} through {payment} and 30% discount application was successful.</p>)
                }
                else {
                    setPaymentmsg(<></>)
                }
                props.func()
            }
            else if (total != 0) {
                setPaymentmsg(<p>Incorrect Discount Code.</p>)
            }
        }
    }

    return (
        <div style={styles}>
            {payment_mesg}
            {paymentmsg}
        </div>
    );
}

export default Payment