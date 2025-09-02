const { register } = useContext(AuthContext);

    const handleRegister = async (formData) => {
        const newUser = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        }
        await register(newUser);
    }
