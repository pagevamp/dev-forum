export const comments = () => {
    let commentFormContainer = document.querySelectorAll('.comment-form-container');

    commentFormContainer.forEach(el => {
        let commentForm = el.querySelector('.comment-form');
        let commentBtn = el.querySelector('.comment-btn');
        let commentCancel = el.querySelector('.comment-cancel');

        commentBtn.addEventListener('click', () => {
            commentBtn.classList.toggle('opacity-20');
            commentBtn.classList.toggle('pointer-events-none');
            commentForm.classList.toggle('hidden');
        })
    
        commentCancel.addEventListener('click', () => {
            commentBtn.classList.toggle('opacity-20');
            commentBtn.classList.toggle('pointer-events-none');
            commentForm.classList.toggle('hidden');
        })
    })

}