import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Row} from 'react-bootstrap'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import contryList from 'react-select-country-list'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Utils from "../../../util/Utils";
const UploadQuestionnaire = ({ setFormState, formState, type }) => {
    const { t } = useTranslation()
    const bottomRef = React.useRef(null)
    const [showAgree, setShowAgree] = useState(false)
    const collapseAgree = () => {
        setShowAgree(!showAgree)
    }
    let option = contryList().getData()
    const handleChange = (value) => {
        setFormState({
            ...formState,
            checkAge: !formState.checkAge
        })
    }
    const handleContribute = (value) => {
        setFormState({
            ...formState,
            contribute_to_science: value,
        })
    }
    const handlePublicly = (value) => {
        setFormState({
            ...formState,
            publicly: value
        })
    }

    const handleCountry = event => {
        console.log(event.target.value)
        setFormState({
            ...formState,
            country: event.target.value
        })
    }
    const titleFontStyle = {
        fontSize: '20px'
    }
    const contentFontStyle = {
        fontSize: '15px'
    }

 
    const selectCountry = (val) => {
        console.log(val);
        setFormState({
            ...formState,
            country: val
        })
    }

    const selectRegion = (val) => {
         setFormState({
            ...formState,
            region: val
        })
    }

    return (
        <Form>
            <fieldset>
                <Form.Label as="legend" sm={2}>
                    <h4 style={titleFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.firstQuestionTitle')}</h4>
                </Form.Label>
                <Form.Group as={Row} style={{ width: '100%', display: 'flex' }} id={'contribute'}>
                    <Form.Check
                        onChange={() => handleContribute(1)}
                        type="radio"
                        label={t(new Utils().getsubDomain()+'.sharedMessage.modal.answer1_1')}
                        name="contribute_to_science"
                        id="1"
                        checked={formState.contribute_to_science}
                        value={formState.contribute_to_science}
                        style={{ marginRight: 20, flex: 1 }}
                    />
                    <Form.Check
                        onChange={() => handleContribute(0)}
                        type="radio"
                        style={{ flex: 1 }}
                        value={formState.contribute_to_science}
                        checked={!formState.contribute_to_science}
                        label={t(new Utils().getsubDomain()+'.sharedMessage.modal.answer1_2')}
                        name="contribute_to_science"
                        id="0"
                    />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    {formState.errors['contribute_to_science']}
                </Form.Control.Feedback>
                <p style={contentFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.firstQuestionNote')}</p>
            </fieldset>
            {
                type !== 'text' ?
                    <fieldset>
                        <Form.Label as="legend" sm={2}>
                            <h4 style={titleFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.secondQuestionTitle')}</h4>
                        </Form.Label>
                        <Form.Group as={Row} style={{ width: '100%', marginLeft: 0, display: 'flex' }} id={'public'} >
                            <Form.Check
                                onChange={() => handlePublicly(2)}
                                type="radio"
                                label={t(new Utils().getsubDomain()+'.sharedMessage.modal.answer2_1')}
                                name="publicly"
                                id="public-1"
                                checked={formState.publicly === 2}
                                style={{ flex: 2 }}
                            />
                            <Form.Check
                                onChange={() => handlePublicly(1)}
                                type="radio"
                                label={t(new Utils().getsubDomain()+'.sharedMessage.modal.answer2_2')}
                                name="publicly"
                                checked={formState.publicly === 1}
                                style={{ flex: 1 }}
                                id="public-2"
                            />
                            <Form.Check
                                onChange={() => handlePublicly(0)}
                                type="radio"
                                label={t(new Utils().getsubDomain()+'.sharedMessage.modal.answer2_3')}
                                name="publicly"
                                style={{ flex: 1 }}
                                checked={formState.publicly === 0}
                                id="public-3"
                            />
                        </Form.Group>
                        <Form.Control.Feedback
                            type={'invalid'}
                            style={{ display: (formState.errors['publicly'] ? 'block' : 'none') }}
                        >{formState.errors['publicly']}
                        </Form.Control.Feedback>
                        <p style={contentFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.secondQuestionNote')}</p>
                    </fieldset>
                    :
                    <fieldset>
                        <Form.Label as="legend" sm={2}>
                            <h4 style={titleFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.secondQuestionTitle')}</h4>
                        </Form.Label>
                        <Form.Group as={Row} style={{ width: '100%', marginLeft: 0, display: 'flex' }} id={'public'} >
                            <Form.Check
                                onChange={() => handlePublicly(1)}
                                type="radio"
                                label={t('Yes')}
                                name="publicly"
                                checked={formState.publicly === 1}
                                style={{ flex: 1 }}
                                id="public-2"
                            />
                            <Form.Check
                                onChange={() => handlePublicly(0)}
                                type="radio"
                                label={t('No')}
                                name="publicly"
                                style={{ flex: 1 }}
                                checked={formState.publicly === 0}
                                id="public-3"
                            />
                        </Form.Group>
                        <Form.Control.Feedback
                            type={'invalid'}
                            style={{ display: (formState.errors['publicly'] ? 'block' : 'none') }}
                        >{formState.errors['publicly']}
                        </Form.Control.Feedback>
                        <p style={contentFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.secondQuestionNote')}</p>
                    </fieldset>

            }

            <Form.Group>
                <Form.Label><h4 style={titleFontStyle}>{t(new Utils().getsubDomain()+'.sharedMessage.modal.thirdQuestionTitle')}</h4></Form.Label>
                <div class="row">
                    <div class="col-lg-6 col-sm-12">
                        <CountryDropdown value={formState.country}  onChange={selectCountry} class="form-control" />
                    </div>
                    {formState.country && (
                        <div class="col-lg-6 col-sm-12">
                            <RegionDropdown country={formState.country} value={formState.region} defaultOptionLabel={"Select State"} onChange={selectRegion} class="form-control" />
                        </div>
                    )}
                    
                </div>
            </Form.Group>

            <Form.Group>
                <Form.Check
                    required
                    name="checkAge"
                    checked={formState.checkAge}
                    label={t(new Utils().getsubDomain()+'.sharedMessage.modal.fourthQuestionTitle')}
                    onChange={handleChange}
                    id="validationFormik0"
                />
            </Form.Group>
            <Form.Control.Feedback type="invalid" style={{ display: (formState.errors['checkAge'] ? 'block' : 'none') }}>
                {formState.errors['checkAge']}
            </Form.Control.Feedback>
            <span ref={bottomRef} style={{ fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }} onClick={() => collapseAgree()}>By clicking the Upload button, you agree to the terms below:
                {showAgree ? <ExpandLessIcon  style={{ marginTop: -3 }} /> : <ExpandMoreIcon style={{ marginTop: -3 }} />}
            </span>
            {showAgree && (
                <div style={{ fontSize: 15, marginTop: 15, fontStyle: 'italic', textAlign: 'justify' }}>
                    Child Mind Institute, Inc., Child Mind Medical Practice, PLLC, Child Mind Medical Practice, PC, and partners (together, “CMI”) does not directly or indirectly practice medicine or dispense medical advice as part of this tool. CMI assumes no liability for any diagnosis, treatment, decision made, or action taken in reliance upon this tool, and assumes no responsibility for your use of this tool. If you do need immediate help, please contact a local care provider. If you have opted to share your data publicly, you release CMI from any claims arising out of the use of your story. You have the right to agree to these terms in your own name or, if applicable, on behalf of your child.
                </div>
            )}
        </Form>
    )
}

export default UploadQuestionnaire