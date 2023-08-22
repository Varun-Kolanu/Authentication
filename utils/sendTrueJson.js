const sendTrue= (res,message) => {
    res.status(200).json({
        success: true,
        message: message
    });
}

export default sendTrue;