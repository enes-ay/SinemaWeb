const getHomePage=(req,res)=>{

    res.render("home",{
        link:"home",
    });
};

const getDetailPage=(req,res)=>{
    res.render("movie_detail",{
        link:"movie_detail"
    });
};

const getRegisterPage=(req,res)=>{

    res.render("register",{
        link:"register",
    });
};

const getLoginPage=(req,res)=>{

    res.render("login",{
        link:"login",
        });
};

const getLogout=(req,res)=>{

    res.cookie("jwt", "", {
        maxAge:1
    });
    res.redirect("/");
};

const getAddmovie=(req,res)=>{

    res.render("addMovie",{
        link:"addMovie",
        });
};


export {getHomePage,getDetailPage,getRegisterPage,getLoginPage,getLogout,getAddmovie};