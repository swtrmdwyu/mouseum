export class MessageView {

    public success(text: string) {
        const messageElement = document.createElement('span');
        messageElement.textContent = text;
        messageElement.classList.add('message');
        messageElement.style.visibility = 'visible';
        document.body.appendChild(messageElement);

        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 3000);
    }
}