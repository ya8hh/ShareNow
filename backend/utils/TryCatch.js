const TryCatch =(handler)=>{
    return async (req,res,next)=>{
        try {
            await handler(req,res,next);
            
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
            console.log("Error {While Login error in (user.controller.js)}:",error)
        }
    }
}
export default TryCatch;