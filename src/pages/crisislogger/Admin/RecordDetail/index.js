import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap';
import ReactPlayer from 'react-player'
import {bindActionCreators} from 'redux'
import {getRecordsById, updateRecordApprove, updateRecordPublish} from '../../../../redux/crisislogger/thunks/admin.thunk'
import Moment from 'react-moment';
import * as QueryString from 'query-string'
import {ApproveCheck} from "../../../../components/crisislogger/ApproveCheck";
import {PublishCheck} from "../../../../components/crisislogger/PublishCheck";
import Utils from '../../../../util/Utils'
import config from '../../../../config'
import "./style.scss"

const RecordDetails = (props) => {
  const {t} = useTranslation();
  const utils = new Utils();
  const subDomainStr = utils.getsubDomain() + '.adminDetails'
  const [dataLoading, setDataLoading] = React.useState(true)
  const {ids, type} = QueryString.parse(props.location.search)
  React.useEffect(() => {
    props.getRecord(ids, type)
    setDataLoading(true)
  }, [dataLoading]);
  const [form, setForm] = useState({
    approveCheck: false,
    publishedCheck: false
  })
  const [firsLoad, setFirstLoad] = useState(false)
  const changeValue = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    // this.setState({ [e.target.name]: e.target.value })
  }
  const handleApproveChange = (id) => {
    props.updateRecordApprove(id, type)
  }
  const handlePublishChange = (id) => {
    props.updateRecordPublish(id)
    setForm({
      ...form,
      publishedCheck: !form.publishedCheck,
    })
  }

  const renderText = (record) => {
    if (record.text) {
      return (<td>{record.text}</td>)
    } else if (record.transcripts) {
      return <td>
        <div>
          {record.transcripts.text}
        </div>
        <br/>
        <div>
          <PublishCheck
            initialValue={record.published}
            onPublishChange={handlePublishChange}
            id={record._id}
          />
        </div>
      </td>
    }
    return <td></td>
  }

  const renderUpload = (object) => {
    if (utils.isVideo(object)) {
      return (
        <td>
          <div>
            <ReactPlayer
              width={250}
              height={150}
              style={{margin: 0}}
              controls={true}
              muted={false}
              url={[
                {src: config.googleBucketURL + object.name, type: 'video/' + object.name.split(".")[1]},
              ]}
            />
          </div>
        </td>
      )

    } else {
      return (
        <td>
          <div>
            <ReactPlayer height={50} width={300} url={config.googleBucketURL + object.name} controls={true}/>
          </div>
        </td>
      )
    }
  }

  let record = props.records
  if (record == null) {
    return <div>Record loading...</div>
  }
  if (!firsLoad) {
    setForm({
      ...form,
      approveCheck: record.approved,
      publishedCheck: record.published
    })
    setFirstLoad(true)
  }

  const renderNameOrEmail = (record, attr) => {
    if (utils.isVideo(record) || utils.isVideo(record)) {
      if (record.user) {
        return record.user[attr]
      }
    } else {
      if (record.user_id) {
        return record.user_id[attr]
      }
    }
  }

  return (
    <div className="upload-detail-container">
      <div>
        <Table style={{textAlign: 'center'}} bordered>
          <thead>
          <tr>
            <th>{t(subDomainStr + ".body.idLabel")}</th>
            <th>{t(subDomainStr + ".body.dateLabel")}</th>
            {props.records.length > 0 && (utils.isVideo(props.records[0]) || utils.isAudio(props.records[0])) ? (
              <th>{t(subDomainStr + ".body.uploadLabel")}</th>) : null}
            <th>{"Text"}</th>
            <th>{t(subDomainStr + ".body.usernameLabel")}</th>
            <th>{t(subDomainStr + ".body.emailLabel")}</th>
            <th>{t(subDomainStr + ".body.domainLabel")}</th>

          </tr>
          </thead>
          <tbody>
          {props.records.map(record => (
            <tr>
              <td>{record._id}
                <br/>
                <ApproveCheck
                  intialValue={record.approved}
                  onApproveChange={handleApproveChange}
                  id={record._id}
                />
              </td>
              <td><Moment format="YYYY-MM-DD">{record.created_at}</Moment></td>
              {
                utils.isVideo(props.records[0]) || utils.isAudio(props.records[0]) ? renderUpload(record) : null
              }
              {
                renderText(record)
              }
              <td>{renderNameOrEmail(record, "name")}</td>
              <td>{renderNameOrEmail(record, "email")}</td>
              <td>{record.where_from}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </div>
  )

}
const mapDispatchToProps = (dispatch) => ({
  getRecord: bindActionCreators(getRecordsById, dispatch),
  updateRecordApprove: bindActionCreators(updateRecordApprove, dispatch),
  updateRecordPublish: bindActionCreators(updateRecordPublish, dispatch)
})
const mapStateToProps = state => {
  return {
    records: state.adminData.singleRecord,
    loading: state.adminData.loading,
    loaded: state.adminData.loaded,
    error: state.adminData.error,

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails)