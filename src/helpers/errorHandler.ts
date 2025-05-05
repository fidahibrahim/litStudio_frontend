import { toast } from "sonner";

const handleError = (error: any) => {
    if (error.response && error.response.data) {
        if (error.response.data.message) {
            if (typeof error.response.data.message === 'object') {
                const firstErrorKey = Object.keys(error.response.data.message)[0];
                toast.error(error.response.data.message[firstErrorKey]);
            } else {
                toast.error(error.response.data.message);
            }
        } else if (error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('An error occurred. Please try again.');
        }
    } else if (error.message) {
        toast.error(error.message);
    } else {
        toast.error('Something went wrong. Please try again.');
    }
};

export default handleError