
const handleSignupWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        // provider.setCustomParameters({ prompt: "select_account" });
        // //console.log(provider);
        // //console.log(auth);
        const user = await signInWithPopup(auth, provider);

        // console.log(user);
        // Send the user data to the server
        const playload = {
            uuid: user.user.uid,
            email: user.user.email,
        };

        // //console.log(user.user);
        // //console.log(user._tokenResponse);
        if (user) {
            let url = `${process.env.REACT_APP_API_KEY}/signup`;

            const res = await axios.post(url, playload);
            console.log(res);
            if (res.data.code === 0) {
                navigate(`/signup/${res.data.uuid}`);
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                setAlert({ type: "success", message: "success" });
            } else if (res.data.code === 1) {
                console.log(res);
                setuser(res.data);
                const Token = JSON.stringify(res.data);
                Cookies.set("User", Token, { expires: 2 });
                navigate(`/alumni`);
                // navigate("/Login");
            } else if (res.data.code === 2) {
                setAlert({ type: "error", message: "You are Blocked" });
            } else if (res.data.code === 3) {
                setAlert({
                    type: "error",
                    message: "your account Already exist wait for intitute approvel",
                });
            }
        }
    } catch (error) { }
};