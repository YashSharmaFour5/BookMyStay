res.cookie("token",token,{
    httpOnly:true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
}) 