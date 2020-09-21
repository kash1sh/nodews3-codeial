class ChatEngine{
    constructor(chatBoxId,userEmail){
        console.log(chatBoxId, userEmail);
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

// bda simple hai ---- sab kuch same chlega , routes controller sab define krna pdega bss page reload nhi hoga -> uske liye 
// jquery ek feature deta h ajax call ka -> ajax call se pehle hum defaultbehaviour rok dete h taaki refresh na ho 
// and routes se hote huye controller tk pahuchte h --- ab hum vaha controller se koi page render nhi kraenge 
// kukki page toh h already ---- itna smje ?ha samajh gaya;;;;;;;   bs ab controller m jo kaam krvana h , like post create ya delete 
// vo bilkul same chelga bss in the end hum json data return krdenge 
// vo json data callback m aaega ajax ki --- or us callback m hum jese chahe vese use krte h 

    connectionHandler(){
        let self = this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets!');


        self.socket.emit('join_room',{
            user_Email:self.userEmail,
            chatRoom:'codeial'
        })
        self.socket.on('user_joined',function(data){
            console.log('a user just joined',data);
        })
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    
    }
}