import dataApi from "~/static/dataApi";

export default ({ }, inject) => {
    inject("dataApi", dataApi);
};
