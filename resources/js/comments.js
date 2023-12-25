export const comments = () => {
    let commentBtn = document.querySelector('.comment-btn');
    let commentForm = document.querySelector('.comment-form');
    let commentCancel = document.querySelector('.comment-cancel');
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
}