import React,{useState} from 'react'
import { Row, Col, Form, Alert, Spinner,InputGroup,FormControl,Button } from 'react-bootstrap'
export const ApproveCheck =(props)=>{
    const [approveCheck,setApproveCheck] = useState(false)
    const [firsLoad,setFirstLoad] = useState(false)
    const handleOnChange = (e)=>{
        setApproveCheck(!approveCheck)
        props.onApproveChange(props.id)
    }
    if(!firsLoad){
        setApproveCheck(props.intialValue)
        setFirstLoad(true)
    }
    return(
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox checked={approveCheck} onChange={(e)=>handleOnChange(e)} />
            </InputGroup.Prepend>
            <div style={{marginLeft:'20px'}}>{approveCheck?"Approved":"Approve"}</div>
        </InputGroup>
    )
}