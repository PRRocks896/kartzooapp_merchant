const EventEmitter:any = {
    events: {},

    /** Dispatch Event */
    dispatch: function (event:any,data:any) {
        if(!this.events[event]) return
        this.events[event].forEach((callback:any) => callback(data))
    },

    /** Subscribe Event */
    subscribe: function (event:any,callback:any) {
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    }
}

export default EventEmitter; 