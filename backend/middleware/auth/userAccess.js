
const checkAccess = (operation) => {
    return (req, res, next) => {
        try {

            if (!req.user) {
                return res.status(401).json({message: "Authentication required" });
            }
            const user = req.user;

            
            
            if (user.isAdmin) {
                next();
                return;
            }
            
            switch(operation.toLowerCase()) {
                case "create":
                    if (!user.canCreate) {
                        return res.status(403).json({message: "User is not authorized to perform action"});
                    }

                    break;

                case "update":
                    if (!user.canUpdate) {
                        return res.status(403).json({message: "User is not authorized to perform action"});
                    }

                    break;
                
                case "delete":
                    if (!user.canDelete) {
                        return res.status(403).json({message: "User is not authorized to perform action"});
                    }

                    break;

                default:
                    return res.status(400).json({message: "Missing or unknown operation in request"});
            }

            next();

        } catch(err) {
            next(err)
        }
    }
}

//for routes requiring admin privileges
const checkAdmin = (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({message: "Authentication required" });
        }
        
        const user = req.user;
        
        if (!user.isAdmin) {
            return res.status(403).json({message: "User is not authorized to perform action"})
        }

        next();

    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkAccess,
    checkAdmin
}