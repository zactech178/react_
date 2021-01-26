import React from 'react'
import "./style.scss"

const Privacy = () => {
    return (
        <div>
            <h1>Privacy / Data Policy</h1>
            <b>What data will CrisisLogger collect?</b>
            <br />
            <p>CrisisLogger.org collects video, audio, text, and questionnaire response data submitted to the website by visitors.  A visitor will also have the opportunity to optionally submit their email address, name, and a password to be able to return to the site and see their prior submissions.  When a visitor to the site submits any information, the data will be stored in a mysql database on a virtual machine in the Child Mind Institute’s Google Cloud Platform account, and when a visitor specifies that they would like their data to be used for scientific research purposes, the data will also be stored on Open Humans servers.</p>

            <b>How will the data be analyzed?</b>
            <br />
            <p>Voice and text/transcript data will be analyzed by researchers in the future by applying tools such as OpenSMILE and natural language processing software.</p>

            <b>What data access permissions does a visitor to the website see and select?</b>
            <br />

            <i>Would you like to contribute to science? -- </i> Yes/No
            <br />
            <p>If you decide to contribute your recording/text to science, you are only giving permission for your data to be stored by our team, and to be contacted before its use in future research (use in research is limited to those 18 years and older).</p>

            <i>Would you like to share publicly? -- </i> Yes/No
            <br />
            <p>If Yes, the Child Mind Institute and its partners may share your text or recording through their websites and social media channels. If No, your story will not be publicly shared in any form.</p>

            <i>By clicking Upload above, you agree to the terms below:</i>

            <p><i>Child Mind Institute, Inc., Child Mind Medical Practice, PLLC, Child Mind Medical Practice, PC, and partners (together, “CMI”) does not directly or indirectly practice medicine or dispense medical advice as part of this tool.  CMI assumes no liability for any diagnosis, treatment, decision made, or action taken in reliance upon this tool, and assumes no responsibility for your use of this tool. If you do need immediate help, please contact a local care provider. If you have opted to share your data publicly, you release CMI from any claims arising out of the use of your story. You have the right to agree to these terms in your own name or, if applicable, on behalf of your child.</i></p>
        </div>
    )
}
export default Privacy