import { defineStrore } from 'pinia'
export const useMessageStore = defineStrore('messge', {
    state () => ({
        message: '' as string
    })
}),
 action: {
    updateMessage(message: string) {
        this.message = message
    },
    resetMessage(){
        this.message = ''
    }
 }