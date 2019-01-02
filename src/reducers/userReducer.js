export const userReducer = (state = {}, action) => {
	switch(action.type) {
	case 'LOGIN_USER':
		return action.userObject
	case 'LOGOUT_USER': 
		return {}
	default:
		return state
	}
}