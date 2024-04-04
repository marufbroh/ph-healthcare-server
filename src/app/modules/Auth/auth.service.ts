const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    console.log("USer logged in...", payload);
};

export const authServices = {
    loginUser
};