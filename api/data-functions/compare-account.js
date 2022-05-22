module.exports = function (account, user) {
    return (account?.id === user?.id) ||
           (account?._id === user?._id) ||
           (account?.id === user?._id) ||
           (account?._id === user?.id)
}