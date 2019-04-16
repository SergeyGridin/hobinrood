import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, receiveErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'login'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => dispatch(login(user)),
  demoLogin: user => dispatch(login(user)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
