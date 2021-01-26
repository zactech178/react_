import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {useTranslation} from 'react-i18next'
import {bindActionCreators} from 'redux'
import queryString from 'query-string'
import Moment from 'react-moment';

import {getAllUploads, downloadCsv} from '../../../../redux/crisislogger/thunks/admin.thunk';
import Utils from '../../../../util/Utils'
import "./style.scss"

const AdminDashboard = (props) => {
  const {t} = useTranslation();
  const utils = new Utils();
  const subDomainStr = utils.getsubDomain() + '.adminDashboard'
  const domain = window.location.host
  const [dataLoading, setDataLoading] = React.useState(true)

  React.useEffect(() => {
    props.loadAllData(queryString.stringify({domain}))
    setDataLoading(true)
  }, [dataLoading]);
  const [form, setForm] = useState({
    usersIncluded: "",
    usersExcluded: "",
    searchText: "",
    refferalCode: "",
    query: "",
    dateStart: "",
    dateEnd: ""
  })
  const changeValue = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    // this.setState({ [e.target.name]: e.target.value })
  }
  const handleApplyPress = () => {
    let data = {}
    if (form.usersIncluded.trim() !== "") {
      data = {
        usersIncluded: form.usersIncluded
      }
    }
    if (form.usersExcluded.trim() !== "") {
      data = {
        ...data,
        usersExcluded: form.usersExcluded
      }
    }
    if (form.searchText.trim() !== "") {
      data = {
        ...data,
        searchText: form.searchText
      }
    }
    if (form.refferalCode.trim() !== "") {
      data = {
        ...data,
        refferalCode: form.refferalCode
      }
    }
    if (form.dateStart.trim() !== "") {
      data = {
        ...data,
        dateStart: form.dateStart
      }
    }
    if (form.dateEnd.trim() !== "") {
      data = {
        ...data,
        dateEnd: form.dateEnd
      }
    }
    data = {
      ...data,
      domain
    }
    props.loadAllData(queryString.stringify(data))
  }


  const mapRows = (object) => {
    let data = {
      audio: {
        publicApproved: [],
        publicRejected: [],
        private: []
      },
      video: {
        publicApproved: [],
        publicRejected: [],
        private: []
      },
      text: {
        publicApproved: [],
        publicRejected: [],
        private: []
      }
    }
    object.forEach(el => {
      if (utils.isVideo(el)) {
        if (isPublicAndApproved(el)) {
          data.video.publicApproved.push(el._id)
        } else if (isPublicAndRejectApproved(el)) {
          data.video.publicRejected.push(el._id)
        } else if (!el.share) {
          data.video.private.push((el._id))
        }
      } else if (utils.isAudio(el)) {
        if (isPublicAndApproved(el)) {
          data.audio.publicApproved.push(el._id)
        } else if (isPublicAndRejectApproved(el)) {
          data.audio.publicRejected.push(el._id)
        } else if (!el.share) {
          data.audio.private.push((el._id))
        }
      } else {
        if (isPublicAndApproved(el)) {
          data.text.publicApproved.push(el._id)
        } else if (isPublicAndRejectApproved(el)) {
          data.text.publicRejected.push(el._id)
        } else if (!el.share) {
          data.text.private.push((el._id))
        }
      }

    })
    return (<tr key={object._id}>
      <td><Moment format="YYYY-MM-DD">{object[0].created_at}</Moment></td>
      <td>
        <Link to={data.video.publicApproved.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.video.publicApproved.join(",")}&type=media`
        } : null}>
          <span className={"public-approve"}>{data.video.publicApproved.length}</span>
        </Link>
        {" "}
        <Link to={data.video.publicRejected.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.video.publicRejected.join(",")}&type=media`
        } : null}>
          <span className={"public-rejected"}>{data.video.publicRejected.length}</span>
        </Link>
        {" "}
        <Link to={data.video.private.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.video.private.join(",")}&type=media`
        } : null}>
          <span className={"private"}>({data.video.private.length})</span>
        </Link>
      </td>
      <td>
        <Link to={data.audio.publicApproved.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.audio.publicApproved.join(",")}&type=media`
        } : null}>
          <span className={"public-approve"}>{data.audio.publicApproved.length}</span>
        </Link>
        {" "}
        <Link to={data.audio.publicRejected.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.audio.publicRejected.join(",")}&type=media`
        } : null}>
          <span className={"public-rejected"}>{data.audio.publicRejected.length}</span>
        </Link>
        {" "}
        <Link to={data.audio.private.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.audio.private.join(",")}&type=media`
        } : null}>
          <span className={"private"}>({data.audio.private.length})</span>
        </Link>
      </td>
      <td>
        <Link to={data.text.publicApproved.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.text.publicApproved.join(",")}&type=text`
        } : null}>
          <span className={"public-approve"}>{data.text.publicApproved.length}</span>
        </Link>
        {" "}
        <Link to={data.text.publicRejected.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.text.publicRejected.join(",")}&type=text`
        } : null}>
          <span className={"public-rejected"}>{data.text.publicRejected.length}</span>
        </Link>
        {" "}
        <Link to={data.text.private.length > 0 ? {
          pathname: "admin/record",
          search: `?ids=${data.text.private.join(",")}&type=text`
        } : null}>
          <span className={"private"}>({data.text.private.length})</span>
        </Link>
      </td>
    </tr>)

  }
  const isPublicAndApproved = (object) => {
    return !!(object.share && object.approved);

  }
  const isPublicAndRejectApproved = (object) => {
    return object.share && !object.approved;

  }
  const getCsvData = () => {
    downloadCsv(queryString.stringify({domain}))
  }
  return (
    <div className="admin-dashboard-container">
      <div>
        <Row>
          <Col lg={4}>{t(subDomainStr + ".form.includeUserLabel")}</Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                value={form.usersIncluded}
                onChange={changeValue}
                placeholder={t(subDomainStr + ".form.includeUserPlaceHodler")}
                name={"usersIncluded"}
              />
            </InputGroup>

          </Col>
        </Row>
        <Row>
          <Col lg={4}>{t(subDomainStr + ".form.excludeUserLabel")}</Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                value={form.usersExcluded}
                onChange={changeValue}
                placeholder={t(subDomainStr + ".form.excludeUserPlaceHolder")}
                name={"usersExcluded"}
              />
            </InputGroup>

          </Col>
        </Row>
        <Row>
          <Col lg={4}>{t(subDomainStr + ".form.searchTextLabel")}</Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                value={form.searchText}
                onChange={changeValue}
                placeholder={t(subDomainStr + ".form.searchTextPlaceHolder")}
                name={"searchText"}
              />
            </InputGroup>

          </Col>
        </Row>
        <Row>
          <Col lg={4}>{t(subDomainStr + ".form.referralCodeText")}</Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                value={form.refferalCode}
                onChange={changeValue}
                placeholder={t(subDomainStr + ".form.referralCodePlaceholder")}
                aria-label="Username"
                aria-describedby="basic-addon1"
                name={"referralCode"}
              />
            </InputGroup>

          </Col>
        </Row>
        <Row>
          <Col lg={4}>{t(subDomainStr + ".form.queryLabel")}</Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                value={props.filter != null ? (JSON.stringify(props.filter)) : ""}
                onChange={changeValue}
                as={"textarea"}
                rows={2}
                disabled
                name={"query"}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>{t(subDomainStr + ".form.dateRangeLabel")}</Col>
          <Col lg={8}>
            <Row>
              <Col sm style={{paddingLeft: 0}}>
                <InputGroup className="mb-3">
                  <FormControl
                    value={form.dateStart}
                    onChange={changeValue}
                    type={"date"}
                    name={"dateStart"}
                  />
                </InputGroup>
              </Col>
              <Col sm={6} style={{paddingRight: 0}}>
                <InputGroup className="mb-3">
                  <FormControl
                    value={form.dateEnd}
                    onChange={changeValue}
                    type={"date"}
                    placeholder="Username"
                    name={"dateEnd"}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={handleApplyPress} variant="secondary">{t(subDomainStr + ".form.applyBtn")}</Button>
          </Col>
        </Row>
        <Row>
          <Col style={{textAlign: 'left'}}>
            <div>
              <span className={"public-approve-color"}>---</span> : Public and approved status by admin
            </div>
            <div>
              <span className={"public-rejected-color"}>---</span> : Public and rejected status by admin
            </div>
            <div>
              <span className={"share-color"}>---</span> : Private by user
            </div>
          </Col>
        </Row>
      </div>
      {/* Data Table content */}
      <div className={"table-container"}>
        <div className="row">
          <Col>
            <Button onClick={getCsvData}>Export Data</Button>
            <div className="csv-text">- The export options is public + accepted + "contributed to science"</div>
          </Col>

        </div>
        <div>
          <Table style={{textAlign: 'center'}} bordered>
            <thead>
            <tr>
              <th>{t(subDomainStr + ".table.thead.date")}</th>
              <th>{t(subDomainStr + ".table.thead.video")}</th>
              <th>{t(subDomainStr + ".table.thead.audio")}</th>
              <th>{t(subDomainStr + ".table.thead.text")}</th>
            </tr>
            </thead>
            <tbody>
            {props.data.map(object => (
              mapRows(object)
            ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => ({
  loadAllData: bindActionCreators(getAllUploads, dispatch),
})
const mapStateToProps = state => {
  return {
    data: state.adminData.data,
    loading: state.adminData.loading,
    loaded: state.adminData.loaded,
    error: state.adminData.error,
    filter: state.adminData.filter

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)