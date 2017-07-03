
var apiURL = API_SERVER + '/api/v1/services'
var listOfServices = new Vue({
    el: '#mylistofsvcs',
    data: {
        svcs: null
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        formatSelector: function(selectors){
            if(!selectors){
                return;
            }
            return Object.keys(selectors).map(function(key){
                return key + "=" + selectors[key]
            })
        },
        fetchData: function () {
            var self = this;
            $.get( apiURL, function( data ) {
                console.log(data)
                self.svcs = data.items;            
            });

        }
    }
})
