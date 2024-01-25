import service from "../../service/service";

// Action creators
// User sign up
export const signUp = (userData) => async (dispatch) => {
  try {
    const { data } = await service.signUp(userData);
    dispatch({ type: "SIGN_UP", payload: data });
  } catch (error) {
    console.log(error);
  }
};

// User sign in
export const signIn = (userData) => async (dispatch) => {
  try {
    const { data } = await service.signIn(userData);
    dispatch({ type: "SIGN_IN", payload: data });
  } catch (error) {
    console.log(error);
  }
};

// User logout
export const logout = () => async (dispatch) => {
  try {
    await service.logout();
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
  }
};