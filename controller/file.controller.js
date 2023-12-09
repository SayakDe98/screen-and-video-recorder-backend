exports.upload = async (req, res) => {
    try {
        res.send({
            message: "File saved successfully",
            success: true,
        })
    } catch (error) {
       res.status(400).send({
        message: error.message,
        success: false
       }) 
    }
};