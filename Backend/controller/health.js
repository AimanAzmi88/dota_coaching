const get = (req, res) => {
    const resObj = {
        message: 'server is running',
        data: true
    }
    res.status(200).json(resObj);
}

const post = (req, res) => {
    const body = req.body
    const resObj = {
        message: 'POST request received',
        data: body
    }
    res.status(200).json(resObj);
}


const healthController = {
    get,
    post
}

export default healthController;    