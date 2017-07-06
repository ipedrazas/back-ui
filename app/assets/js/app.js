
var svcsAPI = API_SERVER + '/api/v1/services';
var epsAPI = API_SERVER + '/api/v1/endpoints';

var listOfServices = new Vue({
    el: '#mylistofsvcs',
    data: {
        svcs: []
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
        hasEndpoints: function(svc){
            if (svc.ep.subsets.length > 0){
                if (svc.ep.subsets[0].addresses){
                    // return svc.ep.subsets[0].addresses[0].ip + ":" + 
                    //     svc.ep.subsets[0].ports[0].port;
                    return "green";
                }                
            }
            return "red";
        },
        fetchData: function () {
            var self = this;
            var eps = new Array();
            var svcs = new Array();

            $.get( epsAPI, function( data ) {
                eps = data.items;                        
                $.get( svcsAPI, function( data ) {
                    svcs = data.items;
                    _.each(svcs, function(svc){
                        svc['ep'] = _.find(eps, function(ep){ 
                            return (ep.metadata.namespace == svc.metadata.namespace)
                                &&  (ep.metadata.name == svc.metadata.name) 
                            
                        });
                    });
                    self.svcs = svcs;
                });
            });
        },
        checkedSvcs: function(svc){            
            if (document.getElementById(svc.metadata.uid).style.display != 'inline'){
                document.getElementById(svc.metadata.uid).style.display = 'inline';
            }else{
                document.getElementById(svc.metadata.uid).style.display = 'none';
            }            
        }

    }
})

// var pressure = new Vue({
//     el: '#pressuredServices',
//     data: {
//         pressured: null 
//     },
//     created: function () {
//         this.fetchData();
//     },
//     methods: {
//         fetchData: function(){
//             $.get( PRESSURE_API, function(data){
//                 console.log(data);
//                 self.pressured = data.items;
//             });
//         }
//     }
// })