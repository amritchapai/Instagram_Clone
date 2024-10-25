import Conversation from "../models/conversation";
import Message from "../models/message";


export const sendMessage = async (req, res)=>{
    try {
        //for sender id
        const senderId = req.id;
        //for receiver id
        const receiverId = req.params.id 
        //get the message
        const {message} = req.body;

        //check whether conversation was there or not
        let conversation = await Conversation.findOne({
            participants: {$all:[senderId, receiverId]}
        })

        //if not create conversation
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        //create a new message
        const messageNew = await Message.create({
             sender: senderId,
             receiver: receiverId,
             message: message
        })

        //push messageNew into conversation if there ins messageNew
        if(messageNew){conversation.message.push(messageNew._id);}

        //save both messageNew and convesation
        await Promise.all([
            conversation.save(), messageNew.save()
        ])


        //return
        return res.status(202).json({
            message: "message sent",
            success: true,
        })

       
    } catch (error) {
        console.log(error)
    }
}