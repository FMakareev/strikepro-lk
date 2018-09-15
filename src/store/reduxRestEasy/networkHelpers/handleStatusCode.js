import {BrowserHistory} from "../../../history";

export const handleStatusCode = (props) => {
    const {status} = props;

    if (status === 401) {
        BrowserHistory.push('/login');
    }

    if (status === 400 || status === 403 || status === 404) {
        BrowserHistory.push('/404')
    }
    if (status >= 500) {
        BrowserHistory.push('/500')
    }
    return props
}

export default handleStatusCode;