    // create a directive to add thousand separator to the number
export default {
    mounted(el, {value}) {
        if(isNaN(value)) {
            el.textContent = "N/A"; 
            return;
        }
        el.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    updated(el, {value}) {
        if(isNaN(value)) {
            el.textContent = "N/A";
            return;
        }
        el.textContent = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}