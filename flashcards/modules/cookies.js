class Cookie {

    /**
     * set() function is an alias of update()
     * 
     * @function set
     * @param {string} name the name of the cookie
     * @param {string} value the value of the cookie
     * @param {number} day_delay the number of day after cookie will expired
     */
    set(name, value, day_delay)
    {
        this.update(name, value, day_delay);
    }

    /**
     * create or update a cookie
     * 
     * @function set
     * @param {string} name the name of the cookie
     * @param {string} value the value of the cookie
     * @param {number} day_delay the number of day after cookie will expired
     */
    update(name, value, day_delay) {
        let date = new Date();
        date.setTime(date.getTime() + (day_delay * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    /**
     * get the value of cookie identified by his name, if the cookie exist return the cookie value else return false
     * 
     * @param {string} name - the name of the cookie that contain wanted value 
     */
    getValue(name) {
        let cookie_value = false;
        let cookie = decodeURIComponent(document.cookie);
        cookie = cookie.split(';');
        cookie.forEach(element => {
            let index = element.indexOf(name + "=");
            if (index >= 0)
                cookie_value = element.substr(element.indexOf("=") + 1, element.length);
        });
        return cookie_value;
    }

    /**
     * delete a cookie identified by his name
     *  
     * @param {string} name - the name of the cookie to delete
     */
    delete(name)
    {
        this.updateCookie(name, "", -1);
    }
}
