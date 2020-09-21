// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // bhai, ek last cheej bata do ki call toh humne pehle kar di thi, toh yeh us call ko accept karne ke liye hai ya kya hai?
            // smja nahi h m kya accept krna , dekho call toh hamne abhi ajax vaali kardi thi, ab jab ham toggle likes bana rahe hai,
            // usme jo ye hai, ye kyu hai? -- hr element  k liye uska personal hoga -- post form k liye alg hai -- comment k liye alg h
            // create k liye alg h delete k liye alg h , esse hi likes k liye b uska alg se h (personalized for that very element)

            // acha matlab vo post ke likes ko show karne ke liye call thi and ye call toggle likes ke is code ke liye, jo hamne likha hai?  bilkul
            // badhiya bhai, samajh gaya ok :) thanks
            // marking it resolved

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
               
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(err) {
                console.log('error in completing the request');
            });
            

        });
    }
}
