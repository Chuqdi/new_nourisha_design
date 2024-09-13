

export default function useFingerPrint(){
        const userAgent = navigator.userAgent;
        return userAgent.replace(/\s+/g, '_');
}