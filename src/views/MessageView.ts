export class MessageView {

    public success(text: string) {
        const messageElement = document.createElement('span');
        messageElement.textContent = text;
    }
}