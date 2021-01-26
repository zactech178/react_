import React,{useState} from 'react'
import { InputGroup} from 'react-bootstrap'
export const PublishCheck =(props)=>{
    const [publishCheck,setpublishCheck] = useState(false)
    const [firsLoad,setFirstLoad] = useState(false)
    const handleOnChange = (e)=>{
        setpublishCheck(!publishCheck)
        props.onPublishChange(props.id)
    }
    if(!firsLoad){
        setpublishCheck(props.initialValue)
        setFirstLoad(true)
    }
    return(
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox checked={publishCheck} onChange={(e)=>handleOnChange(e)} />
            </InputGroup.Prepend>
            <div style={{marginLeft: 10}}>{publishCheck?"Published":"Publish"}</div>
        </InputGroup>
    )
}