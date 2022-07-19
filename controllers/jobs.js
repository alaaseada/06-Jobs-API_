const sayHello = async(req, res) => {
    res.status(200).json({ msg: "Hello from jobs controller."})
}

module.exports = {
    sayHello
}