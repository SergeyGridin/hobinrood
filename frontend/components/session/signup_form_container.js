import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, login, receiveErrors } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: 'signup'
});

const mapDispatchToProps = (dispatch) => ({
  processForm: user => dispatch(signup(user)),
  demoLogin: user => dispatch(login(user)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
