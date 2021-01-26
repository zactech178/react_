import React from 'react'
import { Tabs, Tab, Container, Grid, RadioGroup, FormControl, FormControlLabel, Radio, FormGroup, TextField, TextareaAutosize, Checkbox  } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import csc from 'country-state-city'
import { Button } from 'react-bootstrap'
import TabPanel from './TabPanel'
import questionnaire from './questionnaire'
import { sumbitQuestionnaryDataThunk } from '../../../redux/crisislogger/thunks/questionnary.thunk'
import { changeInput, changeInputMultiselect } from '../../../redux/crisislogger/action/questionnary.action'
import Utils from '../../../util/Utils'
import './style.scss'


class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDomain: new Utils().getCurrentDomain(),
      tabValue: 0,
      countries: csc.getAllCountries(),
      states: [],
      cities: [],
      gender: "",
    };
  }

  changeTab = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  changeStep = (index) => () => {
    this.setState({ tabValue: index });
    window.scrollTo(0, 0);
  };

  handleCountry = (question) => (event) => {
    this.setState({
      states: csc.getStatesOfCountry(event.target.value),
    });
    const country = csc.getCountryById(event.target.value);
    this.props.changeInput(question.part, question.number, country.name);
  };

  handleState = (question) => (event) => {
    this.setState({
      cities: csc.getCitiesOfState(event.target.value),
    });
    const state = csc.getStateById(event.target.value);
    this.props.changeInput(question.part, question.number, state.name);
  };

  handleCities = (question) => (event) => {
    const city = csc.getCityById(event.target.value);
    this.props.changeInput(question.part, question.number, city.name);
  };

  handleChangeGender = (question) => (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.props.changeInput(question.part, question.number, event.target.value);
  };

  handleValueChecked = (question) => (event) => {
    this.props.changeInputMultiselect(
      question.part,
      question.number,
      event.target.name
    );
  };

  handleRadioGroup = (question) => (event) => {
    this.props.changeInput(question.part, question.number, event.target.value);
  };

  handleTextField = (question) => (event) => {
    this.props.changeInput(question.part, question.number, event.target.value);
  };

  changeBirthday = (question) => (event) => {
    this.props.changeInput(question.part, question.number, event.target.value);
  };

  submitQuestionaryData = () => {
    this.props.sumbitQuestionnaryData(this.props.questionnaryData);
  };

  renderTextField = (question) => {
    let onChange = this.handleTextField(question);
    if (question.props.type === "date") {
      onChange = this.changeBirthday(question);
    }
    return (
      <React.Fragment key={question.title}>
        <div className="input-block">
          <div className="label">{question.title}</div>
          <FormControl fullWidth>
            <TextField {...question.props} onChange={onChange} />
          </FormControl>
        </div>
      </React.Fragment>
    );
  };

  renderTextArea = (question) => {
    return (
      <div key={question.number} className="input-block">
        <FormControl fullWidth>
          <TextareaAutosize
            {...question.props}
            onBlur={this.handleTextField(question)}
          />
        </FormControl>
      </div>
    );
  };

  renderCheckBox = (question) => {
    return (
      <div key={question.number} className="input-block">
        <FormControl>
          <FormGroup>
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={this.handleValueChecked(question)}
                    name={option.name}
                    color="default"
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    );
  };

  renderRadioGroup = (question) => {
    let onChange = this.handleRadioGroup(question);
    if (question.title === "Sex") {
      onChange = this.handleChangeGender(question);
    }

    const renderSubField = () => {
      if (
        question.subOptions &&
        question.subOptions.factor === this.state[question.name]
      ) {
        if (question.subOptions.subfieldQuestion.field === "TextField") {
          return this.renderTextField(question.subOptions.subfieldQuestion);
        }
      }
    };
    return (
      <div key={question.number} className="input-block">
        <div className="label">{question.title}</div>
        <FormControl component="fieldset">
          <RadioGroup
            {...question.radioGroupProps}
            aria-label={question.ariaLabel}
            name={question.name}
            value={this.state[question.name]}
            onChange={onChange}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio color="default" size="small" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {renderSubField()}
      </div>
    );
  };

  renderLocationField = (question) => {
    let onChange = () => {};
    let options = [];

    if (question.field === "CountryField") {
      onChange = this.handleCountry(question);
      options = this.state.countries;
    }

    if (question.field === "StateField") {
      onChange = this.handleState(question);
      options = this.state.states;
    }

    if (question.field === "CityField") {
      onChange = this.handleCities(question);
      options = this.state.cities;
    }

    return (
      <div key={question.field} className="input-block">
        <div className="label">{question.title}</div>
        <FormControl fullWidth>
          <TextField
            select
            label={question.label}
            variant="outlined"
            size="small"
            SelectProps={{
              native: true,
            }}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </TextField>
        </FormControl>
      </div>
    );
  };

  renderSectionTitle = (titles) =>
    titles.map((title, index) => (
      <div key={index} className="section-title">
        {title}
      </div>
    ));

  renderSectionBody = (questions) =>
    questions.map((question) => {
      if (
        question.field === "CountryField" ||
        question.field === "StateField" ||
        question.field === "CityField"
      ) {
        return this.renderLocationField(question);
      }

      if (question.field === "RadioGroup") {
        return this.renderRadioGroup(question);
      }

      if (question.field === "Checkbox") {
        return this.renderCheckBox(question);
      }

      if (question.field === "TextArea") {
        return this.renderTextArea(question);
      }
      return this.renderTextField(question);
    });

  render() {
    const { tabValue, currentDomain } = this.state;
    let domainQuestions = []
    if(!currentDomain) {
       domainQuestions = questionnaire['default']; 
    } else {
       domainQuestions = questionnaire[currentDomain];
    }
    return (
      <Container>
        <Tabs
          onChange={this.changeTab}
          value={tabValue}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          transition="fasle"
        >
          {Object.keys(domainQuestions).map((tab, index) => {
            return (
              <Tab key={index} label={`${index + 1}. ${tab}`} value={index} />
            );
          })}
        </Tabs>
        {Object.keys(domainQuestions).map((tab, index) => {
          return (
            <TabPanel key={index} value={tabValue} index={index}>
              <Container maxWidth="sm">
                {domainQuestions[tab].map((section) => {
                  const questions = section.questions || [];
                  return [
                    this.renderSectionTitle(section.title || []),
                    this.renderSectionBody(questions),
                  ];
                })}
              </Container>

              <Container maxWidth="sm">
                <Grid
                  container
                  justify={index > 0 ? "space-between" : "flex-end"}
                  className="input-block"
                >
                  {index > 0 ? (
                    <Button
                      onClick={this.changeStep(index - 1)}
                      variant="light"
                    >
                      PREVIOUS
                    </Button>
                  ) : null}

                  {index + 1 < Object.keys(domainQuestions).length ? (
                    <Button onClick={this.changeStep(index + 1)}>
                      NEXT STEP
                    </Button>
                  ) : null}

                  {index + 1 === Object.keys(domainQuestions).length ? (
                    <Button
                      variant="success"
                      onClick={this.submitQuestionaryData}
                    >
                      SUBMIT
                    </Button>
                  ) : null}
                </Grid>
              </Container>
            </TabPanel>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
    questionnaryData: state.questionnary
}) 

const mapDispatchToProps = dispatch => ({
    changeInput: bindActionCreators(changeInput, dispatch),
    changeInputMultiselect: bindActionCreators(changeInputMultiselect, dispatch),
    sumbitQuestionnaryData: bindActionCreators(sumbitQuestionnaryDataThunk, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire)