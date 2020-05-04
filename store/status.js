
import Status from "~/infrastructure/constants/status";
export const state = () => ({
    status: (context) => {
        return [
            { id: Status.Active, status: context.$t("status.active") },
            { id: Status.Closed, status: context.$t("status.closed") }
        ];
    }

})

export const getters = {
    status: (state) => context => {
        return state.status(context);
    }
}