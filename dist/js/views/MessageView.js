export class MessageView {
    success(text) {
        const messageElement = document.createElement('span');
        messageElement.textContent = text;
    }
}
